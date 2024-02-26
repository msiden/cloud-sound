import requests
from flask import request
import uuid
import db


def sounds() -> dict:
    return db.get_data()


def new_user(user_id: int) -> int:
    response = requests.get(f'http://user_api:8000/user/{user_id}')
    if response.status_code == 404:
        response = requests.post('http://user_api:8000/user', json={"id": user_id})
    return response.status_code


def upload() -> int:
    user_id = request.form["user_id"]
    file = request.files["file"]

    response = requests.get(f'http://user_api:8000/user/{user_id}')

    if response.status_code == 200:
        file_id = str(uuid.uuid4())
        db.insert_data(file_id, file.filename, user_id)
        requests.post('http://file_store:3000/files/', files={file_id: file})

    return response.status_code


def delete(user_id: int, file_id: str) -> int:
    count = db.delete(file_id, user_id)
    if count > 0:
        response = requests.delete(f'http://file_store:3000/files/{file_id}')
        return response.status_code
    return 404
