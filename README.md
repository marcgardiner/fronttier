# frontier-signal

## Getting Started

In order to develop of the Frontier app, you need to install [Docker](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/). We've provided a fully-contained Compose environment to run the Frontier app in dev mode.

We first start by first building the Docker image for our Django app:

```
make build
```

Once the app image is built, we can lauch it and all its dependent services:

```
make upall
```

_Note: The `make upall` command must be run in its own terminal._

The first time you run the app, you'll have to migrate the DB to create the app schema and load up some test data:

```
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py loaddata scripts/db.json
```

The app can now be accessed at http://localhost:8000. This is typically all you need to do in order to run the app.

### Admin Panel

The `loaddata` command will create an admin user with email `admin@frontier.com` and password `frontier123`. You can login to the admin panel at http://localhost:8000/admin.

### Caveats

If changes have been made to the data model, you will have to run the `migrate` command again. You can usually see a log line in the `make upall` output when the Django server boots up informing you that there are unapplied migrations.

If the requirements of the Django app have been modified (`requirements.txt`), you'll have to rebuild the Docker image for it.

## Angular Development

When developing the [Angular app](/web/ng_app), make sure that the Compose environment is running. The development cycle will be pretty simple. Make any changes you want and then build the Angular app:

```
make ng_app
```

This will recompile the Angular app. Once the Angular app has recompiled, the development server will start serving the updated assets.

## API

All API endpoints speak JSON. Clients must set the `CONTENT-TYPE` header to `application/json` when making a `POST` request. Standard HTTP response codes are used to signal error conditions, e.g. 401 if the user is not logged in, 400 is the request is malformed. In case of an error, a simple JSON objects of the following shape is returned:

```
{
    "error": "error message goes here"
}
```

### `/auth/login/<token>`

The `token` is unique for each login URL that we email out to a user to take the survey.

#### `GET`

```
# Response
{
    "last_login": null,
    "num_logins": 0,
    "survey_response": {
        "token": "survey_repsonse_123"
    },
    "token": "login_123",
    "user": {
        "company": null,
        "email": "bojack@horseman.com",
        "first_name": "Bojack",
        "last_name": "Horseman",
        "token": "applicant_123",
        "type": "applicant"
    }
}
```

`survey_response` will be `null` if the token is not linked to a survey, e.g. if it's a link for the Hiring Manager to login to their dashboard. `first_name` and `last_name` can be `null` as well, if the user's registration is incomplete.

#### `POST`

```
# Request
{
    "password": "yodawg",
    "first_name": "Bojack",
    "last_name": "Horseman"
}

# Response

Same as GET
```

`password` is self-explanatory. `first_name` and `last_name` must be provided if the user's registration is incomplete. If the provided password is correct, the server will update the user's profile and log them in (by setting auth cookies etc).

### `survey/invite`

#### `POST`

```
# Request
{
    "type": "exemplar",
    "emails": [
        "bojack@frontier.com"
    ],
    "job": "job_xyz"
}

# Response
{
    "token": "survey_invite_abc"
}
```

### `survey/response/<token>`

```
# Response
{
    "token": "survey_response_xyz",
    "type": "exemplar",
    "user": {
        "company": null,
        "email": "bojack@horseman.com",
        "first_name": "Bojack",
        "last_name": "Horseman",
        "token": "applicant_123",
        "type": "applicant"
    },
    "questions": [
        ...
    ]
}
```
