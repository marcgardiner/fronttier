.PHONY: up

up:
	docker-compose up postgres redis

upall:
	docker-compose up

runserver:
	python manage.py runserver 0.0.0.0:8000 --settings=frontier.settings.dev

runworker:
	celery -A frontier worker -l info

reset:
	docker-compose rm -f

migrate:
	python manage.py makemigrations --settings=frontier.settings.dev
	python manage.py migrate --settings=frontier.settings.dev

shell:
	python manage.py shell --settings=frontier.settings.dev

dbshell:
	python manage.py dbshell --settings=frontier.settings.dev

test:
	python manage.py test --settings=frontier.settings.dev

images:
	docker-compose up -d --no-deps --build web

build: ng_build images

ng_build:
	(cd web/ng_app && make build)

ng_install:
	(cd web/ng_app && make install)

ng_test:
	(cd web/ng_app && make test)

deploy:
	heroku container:push --recursive --app frontier-web

dumpdata:
	python manage.py dumpdata --settings=frontier.settings.dev --indent=2 > scripts/db.json

loaddata:
	python manage.py loaddata --settings=frontier.settings.dev scripts/db.json

bootstrap: loaddata