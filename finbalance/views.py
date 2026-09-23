from django.shortcuts import render

from knowledge.models import Article


def home(request):
    articles = Article.objects.all().order_by("-created_at")[:3]
    return render(request, "home.html", {"active_url": "", "articles": articles})
