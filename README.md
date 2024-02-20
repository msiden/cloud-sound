# Take home assignment

Using your favorite programming language (relevant to the position), we want you to build a small system. During the technical interview, you will show a running working version of the system, and we will look at the implementation (code) together.

Your solution will be the basis for a discussion. Do not spend too much time perfecting the solution as you will be able to fill in blanks and explain details in person. Also, focus on craftsmanship, not the presentation (UI).

If you feel that some detail is unclear, just make reasonable assumptions and we'll discuss them during the technical interview.

## System description

The system in question is a simple sound-sharing service where users can upload and listen to sounds on a web page.

It consists of a user-facing API service ("Cloud Sound"), two internal backend services ("File store service" and "User API") and a web frontend.


### Get up and running
Given you have [Docker](https://www.docker.com/products/docker-desktop) installed, the provided services should start if you run:
`docker compose up --build`

## Specification of the assignment
Your task is to complete the system described above by building the API service ("Cloud Sound") and the web frontend.

You are allowed to use any third party libraries and frameworks of your liking, but please motivate why you're using them.

Once the system is complete, it should start and become operational by running `docker compose up`

### API service ("Cloud Sound")

You need to implement an API service that provides the following:

* An open `GET` endpoint that returns a list of existing sounds
* An open `POST` endpoint that accepts a new user ID and creates a user by calling the `user_api` backend. The `user_api` backend requires that user ID:s are unique
* A protected `POST` endpoint where a logged in user can upload new sounds
  * For simplicity, being "logged in" only means that the client in one way or another identifies itself with at least a numeric (int) `user_id`, which should be verified with the `user_api` backend.
  * A Postgres database for the purpose of keeping track of file uploads is defined in the `docker-compose` file for convenience. If you prefer another method feel free to use that instead.
  * The actual song files should be stored using the `file_store` backend service described below
  * The endpoint needs to handle the case where multiple different files with equal filenames are uploaded
* A protected `DELETE` endpoint where a logged in user can delete the sounds they have uploaded themselves (but not sounds from other users). A deleted sound should also be deleted from the `file_store` backend

The API Service should be accessible over HTTP on `http://localhost:8080`. It does not need to support HTTPS.

### Frontend

Provided is an embryo for a simple web frontend. This should be extended with the following functionality:

* List existing sounds
* Register a new user with the API Service given a numeric user ID
* Enter a "logged in" state by identifying itself to the server with at least a numeric `user_id`
* Given a logged in status, a user should be able to upload new sounds
* Given a logged in status, a user should be able to delete the sounds they have uploaded

The frontend should be accessible over HTTP on `http://localhost`. It does not need to support HTTPS

---

The two existing internal backend services are described below. You should not have to make any changes to these services.

### User API
The `user_api` is a service that handles existing users in the system. It is accessible on `http://user_api:8080` on the internal docker network. It is not accessible from the external network.
It provides two endpoints:

##### GET `/user/{user_id}`
Given a `user_id` returns the status code 200 if the user exists, or 404 if not.

##### POST `/user`
Add a new user to the service.

Accepts a JSON payload:
```json
{
  "id": int
}
```

### File store service
The `file_store` is a file storage service (like S3 or GC Cloud Storage). It supports uploading, retrieving, and deleting files. Files can be named anything and contain anything. It is accessible on `http://file_store:3000` on the internal docker network and `http://localhost:8081` on the external network.

The service exposes three endpoints:

##### `GET /files/{id}`
Retrieves a file as an octet-stream

##### `DELETE /files/{id}`
Deletes a file

##### `POST /files/`
Uploads a file as a multipart form. The file id will be given by the field name in the multipart form, e.g

```bash
curl -F my-id-567=@my-sound.mp3 {URL}/files/
```

```bash
curl {URL}/files/my-id-567
 -> my-sound.mp3 as octet stream
```

Uploading another file to the same id will overwrite the old file.

---
Good luck!
