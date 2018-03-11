import traceback

from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone


@shared_task(bind=True)
def process_email(self, token):
    from messaging.models import Email

    email = Email.load(token)
    if email.state == Email.State.SUCCESS:
        return

    context = email.context.copy()
    context['user'] = email.user
    if 'login_link' not in context:
        context['login_link'] = email.user.login_link

    html = render_to_string(email.template, context)

    try:
        send_mail(
            context['subject'],
            'HTML support is required to view this message.',
            'friends@frontier.com',
            [email.user.email],
            html_message=html
        )
        email.state = Email.State.SUCCESS
    except Exception as e:
        email.state = Email.State.FAILED
        email.storytime = '%s\n%s' % (e, traceback.format_exc())
        self.retry(exc=e, countdown=30 * 60, max_retries=5)
    finally:
        email.processed_at = timezone.now()
        email.save()
