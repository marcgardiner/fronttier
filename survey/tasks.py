from celery import shared_task

from survey.models import SurveyInvitation


@shared_task
def process_survey_invitation(token):
    invitation = SurveyInvitation.load(token)
