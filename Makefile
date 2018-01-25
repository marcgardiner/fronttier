.PHONY: docker

dc:
	docker-compose up

run:
	python manage.py runserver --settings=frontier.settings.dev

clean:
	docker-compose rm -f

migrate:
	python manage.py makemigrations --settings=frontier.settings.dev
	python manage.py migrate --settings=frontier.settings.dev

shell:
	python manage.py shell --settings=frontier.settings.dev

docker:
	docker build docker/web/ -t frontier:web
