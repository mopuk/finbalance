import math

from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True)

    def __str__(self) -> str:
        return f"Category: {self.title}"

    def to_upper_case(self):
        return self.title.upper()


class Article(models.Model):
    title = models.CharField(max_length=256)
    slug = models.SlugField(unique=True, max_length=256)
    preview_text = models.TextField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="articles"
    )

    def __str__(self) -> str:
        return f"Article: {self.title}"

    def readtime(self):
        chars_per_minute = 1000
        return max(1, math.ceil(len(self.content) / chars_per_minute))
