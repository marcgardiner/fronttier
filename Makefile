.PHONY: up

up:
	docker-compose up

runserver:
	python manage.py runserver --settings=frontier.settings.dev

reset:
	docker-compose rm -f

migrate:
	python manage.py makemigrations --settings=frontier.settings.dev
	python manage.py migrate --settings=frontier.settings.dev

console:
	python manage.py shell --settings=frontier.settings.dev

images:
	docker build docker/web/ -t frontier:web

test:
	python manage.py test --settings=frontier.settings.test

build:
	docker-compose up -d --no-deps --build web
