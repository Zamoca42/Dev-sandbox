from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Post

# Register your models here.


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'photo_tag', 'message',
                    'message_length', 'is_public', 'created_at', 'update_at']
    list_display_links = ['message']
    # admin내에 검색, DB의 where쿼리 대상 필드
    search_fields = ['message']
    # 지정 필드값으로 필터링 옵션 제공
    list_filter = ['created_at', 'is_public']

    def photo_tag(self, post):
        if post.photo:
            return mark_safe(f'<img src="{post.photo.url}" style="width: 100px" />')
        return None


admin.site.register(Post, PostAdmin)
