.PHONY: up

up:
	docker-compose up postgres redis

upall:
	docker-compose up

runserver:
	python manage.py runserver --settings=frontier.settings.dev

runworker:
	celery -A frontier worker -l info

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

testall: test
	(cd web/ng_app && make test)

build: ng_build
	docker-compose up -d --no-deps --build web

ng_build:
	(cd web/ng_app && make build)

ng_install:
	(cd web/ng_app && make install)

deploy:
	heroku container:push --recursive --app frontier-web

dumpdata:
	python manage.py dumpdata --settings=frontier.settings.dev --indent=2 > scripts/db.json

loaddata:
	python manage.py loaddata --settings=frontier.settings.dev scripts/db.json

bootstrap: loaddata