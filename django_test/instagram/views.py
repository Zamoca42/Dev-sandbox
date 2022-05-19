from django.views.generic import ListView, DetailView
from django.http import HttpRequest, HttpResponse, Http404
from django.shortcuts import get_object_or_404, render
from .models import Post

# Create your views here.

post_list = ListView.as_view(model=Post)

# /instagram/
# /instagram/1/
# /instagram/10/

# def post_list(request):
#     qs = Post.objects.all()
#     q = request.GET.get('q', '') # 검색어 q를 요청해서 있으면 q를 반환하고 없으면 빈문자열 반환
#     if q:
#         qs = qs.filter(message__icontains=q) # 검색어가 있으면 검색어가 포함된 단어 출력
#     # instagram/templates/instagram/post_list.html
#     return render(request, 'instagram/post_list.html',{
#         'post_list': qs, # 템플릿단으로 넘겨줌
#         'q':q,
#     })
#     # request.POST
#     # request.FILES


# def post_detail(request: HttpRequest, pk: int) -> HttpResponse:
#     post = get_object_or_404(Post, pk=pk)
#     # try:
#     #     post = Post.objects.get(pk=pk) # field = value
#     # except Post.DoesNotExist:
#     #     raise Http404
#     return render(request, 'instagram/post_detail.html', {
#         'post': post,
#     })

post_detail = DetailView.as_view(model=Post)
