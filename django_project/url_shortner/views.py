from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from url_shortner.serializers import UserSerializer, UrlMapSerializer
from url_shortner.utils import *


# Create your views here.
@api_view(['POST'])
def signup(request):
    try:
        request_data = JSONParser().parse(request)
        print(request_data)
        user_serializer = UserSerializer(data=request_data)
        print(user_serializer)
        if user_serializer.is_valid():
            user_serializer.save()
            print(user_serializer.data)
            return Response(user_serializer.data.get('id'), 201)
        else:
            return Response("Invalid Data", 400)
    except InsufficientParameterException as e:
        print(e)
    except UserExistsException as e:
        print(e)


@api_view(['POST'])
def login(request):
    try:
        request_data = JSONParser().parse(request)
        print(request_data)
        user_data = get_user_data(request_data)
        if user_exists(user_data):
            return Response(get_user_id(user_data), 200)
        else:
            return Response("User does not exist", 400)
    except InsufficientParameterException as e:
        return Response(str(e), 400)


@api_view(['POST'])
def create_short_url(request):
    request_data = JSONParser().parse(request)
    print(request_data)
    url = get_short_url()
    print(url)
    if put_into_db(request_data['destination_url'], url, request_data['user_id']):
        return Response(url, 200)
    return Response("Couldn't create url", 400)


@api_view(['POST'])
def short_url_with_user_input(request):
    request_data = JSONParser().parse(request)
    if is_given_short_url_valid(request_data['source_url']):
        if put_into_db(request_data['destination_url'], request_data['source_url'], request_data['user_id']):
            return Response(str(request_data['source_url']), 200)
        else:
            return Response("Invalid request", 400)
    else:
        return Response("Invalid Short Url", 400)


@api_view(['GET'])
def get_all_short_url_of_user(request, user_id):
    all_urls_data = get_all_short_urls_of_current_user(user_id)
    if all_urls_data is not None:
        urls_data = UrlMapSerializer(all_urls_data, many=True)
        return Response(urls_data.data, 200)
    else:
        return Response("User does not exist", 400)


@api_view(['POST'])
def delete_short_url(request):
    request_data = JSONParser().parse(request)
    urlmap_to_delete = delete_if_given_short_url_exists(request_data['source_url'], request_data['user_id'])
    print(urlmap_to_delete)
    if urlmap_to_delete is not None:
        urlmap_data = UrlMapSerializer(urlmap_to_delete)
        return Response(urlmap_data.data, 200)
    else:
        return Response("Could not delete", 400)


@api_view(['GET'])
def get_original_url(request, unique_id: str):
    print(request, unique_id)
    short_url: str = process_request_to_get_short_url(unique_id)
    if given_short_url_exists(short_url):
        original_urlmap = get_destination_url(short_url)
        update_urlmap(original_urlmap)
        return redirect(original_urlmap['destination_url'])
    else:
        return Response("there is no short url with url: " + short_url, 404)
