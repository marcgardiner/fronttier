# frontier-signal

[![Build Status](https://semaphoreci.com/api/v1/projects/82efddf7-c131-4e8f-ae98-f518b9f7c34a/1850064/badge.svg)](https://semaphoreci.com/frontier-signal/frontier-signal)

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

### Authentication

#### `/auth/login/<token>`

The `token` is unique for each login URL that we email out to a user to take the survey.

##### `GET`

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
        "token": "user_123",
        "type": "regular"
    }
}
```

`survey_response` will be `null` if the token is not linked to a survey, e.g. if it's a link for the Hiring Manager to login to their dashboard. `first_name` and `last_name` can be `null` as well, if the user's registration is incomplete.

##### `POST`

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

#### `/auth/login`

This endpoint can be used to login a user using their email and password.

##### `POST`

```
# Request
{
    "email": "bojack@horseman.com"
    "password": "yodawg"
}

# Response
{
    "company": null,
    "email": "bojack@horseman.com",
    "first_name": "Bojack",
    "last_name": "Horseman",
    "token": "user_123",
    "type": "regular"
}
```

#### `/auth/logout`

This endpoint can be used to logout a user.

#### `auth/company`

##### `GET`

```
# Response
{
    "data": [
        {
            "token": "company_UMBBESMmPICpMEDw",
            "name": "The Boring Company",
            "logo": "http://boring.com/logo.jpg    ",
            "location": {
                "address1": "100 Van Ness Ave",
                "address2": "#525",
                "city": "San Francisco",
                "state": "CA",
                "postal_code": "94123",
                "phone_number": "+11234567890"
            }
        },
        ...
    ]
}
```

##### `GET`

```
Empty response
```

### Survey

#### `survey/invite`

##### `POST`

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

#### `survey/job`

##### `GET`

```
# Response
{
    "data": [
        {
            "token": "job_xxx",
            "company": "company_yyy",
            "type": "intern",
            "level": "mid",
            "title": "Lawyer",
            "description": "Corporate MNA",
            "state": "open",
            "surveys": {
                "exemplar": {
                    "total": 5,
                    "complete": 1,
                    "in_progress": 1,
                    "expired": 3
                },
                "applicant": {
                    "total": 25,
                    "complete": 12,
                    "in_progress": 9,
                    "pending": 4
                }
            },
            "city": "San Francisco",
            "country": "US",
            "state": "CA"
        },
        ...
    ]
}
```

##### `POST`

This endpoint can be used to create a new job object. The response will include the token of the newly created job object.

```
# Request
{
  "status": "open",
  "description": "YOLO!",
  "company": "company_aR0xncJDmPRkoOVM",
  "hard_skills": {
    "skill3": [
      "tool1",
      "tool2",
      "tool3"
    ],
    "skill2": [
      "tool1",
      "tool2",
      "tool3"
    ],
    "skill1": [
      "tool1",
      "tool2",
      "tool3"
    ]
  },
  "soft_skills": {
    "skill3": [
      "task1",
      "task2",
      "task3"
    ],
    "skill2": [
      "task1",
      "task2",
      "task3"
    ],
    "skill1": [
      "task1",
      "task2",
      "task3"
    ]
  },
  "city": "San Francisco",
  "level": "mid",
  "country": "US",
  "title": "Data Scientist",
  "state": "CA",
  "type": "intern"
}

# Response
{
  "status": "open",
  "city": "San Francisco",
  "surveys": {

  },
  "description": "YOLO!",
  "level": "mid",
  "country": "US",
  "company": "company_OC7MUNiEJQSUFc6e",
  "title": "Data Scientist",
  "state": "CA",
  "token": "job_FfRvQHX8U5nLxate",
  "hiring_managers": [],
  "hard_skills": {
    "skill3": [
      "tool1",
      "tool2",
      "tool3"
    ],
    "skill2": [
      "tool1",
      "tool2",
      "tool3"
    ],
    "skill1": [
      "tool1",
      "tool2",
      "tool3"
    ]
  },
  "type": "intern",
  "soft_skills": {
    "skill3": [
      "task1",
      "task2",
      "task3"
    ],
    "skill2": [
      "task1",
      "task2",
      "task3"
    ],
    "skill1": [
      "task1",
      "task2",
      "task3"
    ]
  }
}
```

#### `survey/job/<token>`

##### `GET`

You can look up details for a specific job using its token.

```
# Response
Same as response for POST /survey/job
```

##### `POST`

This endpoint can be used to update properties for an existing job object.

```
# Request
{
    "type": "full_time",
    "hiring_managers": ["hm_OC7MUNiEJQSUFc6e"]
}

# Response
Same as GET
```

#### `survey/response/<token>`

##### `GET`

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
        "token": "user_123",
        "type": "regular"
    },
    "questions": [
        ...
    ]
}
```
