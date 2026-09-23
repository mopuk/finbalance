from django.urls import path

from . import views

app_name = "knowledge"

urlpatterns = [
    path(
        "",
        views.knowledge,
        name="index",
    ),
    path("articles/<slug:slug>/", views.article, name="article"),
]
