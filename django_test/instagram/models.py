from audioop import reverse
from django.core.validators import MinLengthValidator
from django.conf import settings
from django.db import models
from django.urls import reverse

# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='+')
    message = models.TextField(
        validators=[MinLengthValidator(10)]
    )
    tag_set = models.ManyToManyField('Tag', blank=True)
    photo = models.ImageField(blank=True, upload_to='instagram/post/%Y/%m/%d')
    is_public = models.BooleanField(default=False, verbose_name='공개여부')
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    # Java의 toString
    def __str__(self):
        # return f"Custom Post object ({self.id})"
        # return "Custom Post object({}).format(self.id)"
        return self.message

    def get_absolute_url(self):
        return reverse('instagram:post_detail', args=[self.pk])

    def message_length(self):
        return len(self.message)

    class Meta:
        ordering = ['-id']


class Comment(models.Model):
    # post_id 필드가 생성이 됩니다.
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    mssage = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    # post_set = models.ManyToManyField(Post)

    def __str__(self):
        return self.name
    
