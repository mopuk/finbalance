from django.contrib import admin
from django.urls import include, path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("knowledge/", include("knowledge.urls")),
    path("calculator/", include("calculator.urls")),
    path("admin/", admin.site.urls),
]
