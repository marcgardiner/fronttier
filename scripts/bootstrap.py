import argparse
from datetime import date
import django
import os
import sys


BASE_DIR = os.path.join(os.path.dirname(__file__), os.path.pardir)
sys.path.append(BASE_DIR)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'frontier.settings.dev')

django.setup()


def main(args):
    from django.conf import settings
    from django.contrib.sites.models import Site

    site = Site.objects.get(id=settings.SITE_ID)
    site.domain = settings.ENV.domain
    site.save()

    from business.models import Administrator, Applicant, HiringManager, User, Company

    company, _ = Company.objects.get_or_create(name=args.company)

    users = []

    user = Administrator(
        first_name='Admin',
        last_name='Frontier',
        email=args.admin,
        is_superuser=True,
    )
    user.set_password(args.password)
    users.append(user)

    user = Applicant(
        first_name='Applicant',
        last_name='Frontier',
        email=args.applicant,
    )
    user.set_password(args.password)
    users.append(user)

    user = HiringManager(
        first_name='HM',
        last_name='Frontier',
        email=args.hiring_manager,
        company=company,
    )
    user.set_password(args.password)
    users.append(user)

    for user in users:
        if User.objects.filter(email=user.email).exists():
            continue
        user.save()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Bootstrap new Frontier environment.')
    parser.add_argument('--company', help='Company Name', default='Frontier')
    parser.add_argument('--applicant', help='Applicant Email', default='applicant@frontier.com')
    parser.add_argument('--hiring-manager', help='Hiring Manager Email', default='hm@frontier.com')
    parser.add_argument('--admin', help='Administrator Email', default='admin@frontier.com')
    parser.add_argument('--password', help='Password', default='frontier123')

    args = parser.parse_args()
    main(args)
