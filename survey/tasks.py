from celery import shared_task
from django.utils.crypto import get_random_string

from business.models import LoginLink
from survey.models import SurveyInvitation, SurveyResponse


@shared_task
def process_survey_invitation(token):
    invitation = SurveyInvitation.load(token)

    if invitation.state not in (
        SurveyInvitation.State.PENDING,
        SurveyInvitation.State.IN_PROGRESS
    ):
        return

    invitation.state = SurveyInvitation.State.IN_PROGRESS
    invitation.save()

    for email in invitation.emails:
        if Applicant.objects.filter(email=email).exists():
            continue

        applicant = Applicant(email=email)
        applicant.set_password(get_random_string(16))
        applicant.save()

        sr = SurveyResponse(user=applicant, survey=invitation.survey)
        sr.save()

        ll = LoginLink(user=applicant, survey_response=sr)
        ll.save()

        email = Email(
            user=applicant,
            template='messaging/%s_invite.html' % invitation.type,
            context={
                'login_link': ll.token,
                'company': invitation.hiring_manager.company.name,
                'hiring_manager': invitation.hiring_manager.first_name,
            }
        )
        email.save()

    invitation.state = SurveyInvitation.State.SUCCESS
    invitation.save()
