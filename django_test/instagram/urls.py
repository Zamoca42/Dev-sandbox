from django.urls import path

from . import views

app_name = 'instagram' # URL Reverse에서 namespace역할

urlpatterns = [
    path('', views.post_list, name='post_list'),
    path('<int:pk>', views.post_detail, name='post_detail')
]
