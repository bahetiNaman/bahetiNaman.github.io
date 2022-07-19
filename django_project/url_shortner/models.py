from mongoengine import *
import datetime

# Create your models here.
class User(Document):
    username = StringField(required=True, unique=True, min_length=3, max_length=8)
    password = StringField(required=True, min_length=5)


class UrlMap(Document):
    source_url = URLField(required=True)
    destination_url = URLField(required=True)
    user_id = ReferenceField(User, reverse_delete_rule=CASCADE)
    last_hit_timestamp = DateTimeField(required=True, default=datetime.datetime.now())
    total_hits = IntField(required=True, default=0)