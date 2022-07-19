from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('get_short_url/', views.create_short_url, name="get_short_url"),
    path('short_url_with_url_given_by_user/', views.short_url_with_user_input, name="short_url_with_user_input"),
    path('delete_short_url', views.delete_short_url, name="delete_short_url"),
    path('get_all_short_urls/<str:user_id>/', views.get_all_short_url_of_user, name="get_all_short_urls_of_current_user"),
    # path('<str:unique_id>', views.get_original_url, name='get_original_url'),
    path('<str:unique_id>/', views.get_original_url, name='get_original_url'),

]


# http://localhost:8000/Y3TOo
# 62ce8ba5f5bba4c915eaee57