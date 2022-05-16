from django.shortcuts import render
from .models import Post

# Create your views here.

def post_list(request):
    qs = Post.objects.all()
    q = request.GET.get('q', '') # 검색어 q를 요청해서 있으면 q를 반환하고 없으면 빈문자열 반환
    if q:
        qs = qs.filter(message__icontains=q) # 검색어가 있으면 검색어가 포함된 단어 출력
    # instagram/templates/instagram/post_list.html
    return render(request, 'instagram/post_list.html',{
        'post_list': qs, # 템플릿단으로 넘겨줌
        'q':q,
    })
    # request.POST
    # request.FILES