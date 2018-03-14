from celery import shared_task
from django.utils.crypto import get_random_string

from business.models import Applicant, LoginLink
from messaging.models import Email
from survey.models import Survey, SurveyInvitation, SurveyResponse


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

        applicant = Applicant.objects.create_user(
            get_random_string(), email=email, password=get_random_string())
        sr = SurveyResponse.objects.create(
            user=applicant, survey=invitation.survey)
        ll = LoginLink.objects.create(user=applicant, survey_response=sr)

        company_name = invitation.hiring_manager.company.name

        if sr.survey.type == Survey.Type.EXEMPLAR:
            subject = 'Invitation to Participate in Frontier Signal'
        else:
            subject = 'Great News from %s and Frontier Signal' % company_name

        email = Email.objects.create(
            user=applicant,
            template='messaging/%s_invite.html' % invitation.type,
            context={
                'subject': subject,
                'login_link': ll.token,
                'company': company_name,
                'hiring_manager': invitation.hiring_manager.first_name,
            }
        )

    invitation.state = SurveyInvitation.State.SUCCESS
    invitation.save()
