from django.contrib import admin
from .models import Post

# Register your models here.


class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'message',
                    'message_length', 'is_public', 'created_at', 'update_at']
    list_display_links = ['message']
    # admin내에 검색, DB의 where쿼리 대상 필드
    search_fields = ['message']
    # 지정 필드값으로 필터링 옵션 제공
    list_filter = ['created_at', 'is_public']


admin.site.register(Post, PostAdmin)
