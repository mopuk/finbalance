from django.core.paginator import Paginator
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Article, Category

sort_options = {
    "dateASC": "created_at",
    "dateDESC": "-created_at",
    "titleASC": "title",
    "titleDESC": "-title",
}


def knowledge(request: HttpRequest) -> HttpResponse:

    articles = Article.objects.all()
    articles_number = articles.count()

    sort = request.GET.get("sort", "dateDESC")

    if sort:
        articles = articles.order_by(sort_options[sort])

    categories = Category.objects.all()
    featured = Article.objects.first()

    query = request.GET.get("query", "")
    category = request.GET.get("category", "")

    if query:
        articles = articles.filter(title__icontains=query)

    if category:
        articles = articles.filter(category__slug=category)

    paginator = Paginator(articles, 6)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(
        request,
        "knowledge/knowledge.html",
        {
            "articles_number": articles_number,
            "page_obj": page_obj,
            "active_url": "knowledge",
            "categories": categories,
            "featured": featured,
        },
    )


def article(request: HttpRequest, slug: str) -> HttpResponse:
    article = get_object_or_404(Article, slug=slug)

    return render(request, "knowledge/article.html", {"article": article})
