import random
from typing import Optional, Any

from django.utils.crypto import get_random_string

from url_shortner.exceptions import *
from url_shortner.models import *

starting_url = "http://localhost:8000/"
current_int = 1


def get_unique_identifier() -> str:
    digits = 3
    random_number = random.randint(1, 2 ** (4 * digits))
    return hex(random_number)


def get_user_data(formData) -> dict:
    if 'username' not in formData or formData['username'] == '':
        print("username not provided")
        raise InsufficientParameterException("Username not provided")
    if 'password' not in formData or formData['password'] == '':
        print("password not provided")
        raise InsufficientParameterException("Password not provided")
    user = {'username': formData['username'], 'password': formData['password']}
    return user


def user_exists(user_data: dict) -> bool:
    user = User.objects(username=user_data["username"], password=user_data['password'])
    return len(user) != 0


def create_user(user_data: dict) -> User:
    if user_exists(user_data):
        raise UserExistsException("User Already Exists")
    return User(user_data['username'], user_data['password'])


def get_user_id(user_data: dict) -> str:
    users: User = User.objects(username=user_data['username'], password=user_data['password'])
    return str(users[0].id)


def is_given_short_url_valid(custom_url: str) -> bool:
    if custom_url.startswith(starting_url):
        return True
    else:
        return False


def get_short_url() -> str:
    return starting_url + get_random_string(5)


def get_user_for_user_id(user_id: str) -> Optional[Any]:
    users = User.objects(id=user_id)
    if len(users) == 0:
        return None
    user = users[0]
    return user


def url_for_given_user_already_exists(url: str, user_id: str) -> bool:
    user = get_user_for_user_id(user_id)
    if user is None:
        return True
    url = UrlMap.objects(destination_url=url, user_id=user)
    return len(url) != 0


def put_into_db(actual_url: str, generated_short_url: str, user_id: str) -> bool:
    try:
        if url_for_given_user_already_exists(actual_url, user_id):
            print("Already exists")
            return False
        else:
            user = get_user_for_user_id(user_id)
            url_map = UrlMap(source_url=generated_short_url, destination_url=actual_url, user_id=user, total_hits=1, last_hit_timestamp=datetime.datetime.now())
            url_map.save()
            return True
    except Exception as e:
        print(e)


def get_all_short_urls_of_current_user(user_id: str):
    try:
        user = get_user_for_user_id(user_id)
        if user is not None:
            return UrlMap.objects(user_id=user)
        else:
            return None
    except Exception as e:
        print(e)
        return None


def given_short_url_exists_for_given_user(given_url: str, user_id: str) -> bool:
    user = get_user_for_user_id(user_id)
    if user is not None:
        urls = UrlMap.objects(source_url=given_url, user_id=user)
        return len(urls) != 0
    else:
        return False


def given_short_url_exists(given_url: str) -> bool:
    urls = UrlMap.objects(source_url=given_url)
    return len(urls) != 0


def process_request_to_get_short_url(unique_id: str) -> str:
    return starting_url + unique_id


def get_destination_url(source_url: str) -> UrlMap:
    urls = UrlMap.objects(source_url=source_url)
    return urls[0]


def update_urlmap(urlmap: UrlMap) -> bool:
    try:
        UrlMap.objects.get(source_url=urlmap.source_url).update(total_hits=urlmap.total_hits+1, last_hit_timestamp=datetime.datetime.now())
        return True
    except Exception:
        return False


def delete_if_given_short_url_exists(source_url: str, user_id: str):
    if given_short_url_exists_for_given_user(source_url, user_id):
        user = get_user_for_user_id(user_id)
        object_to_delete = UrlMap.objects(source_url=source_url, user_id=user)[0]
        object_to_delete.delete()
        return object_to_delete
    else:
        return None
