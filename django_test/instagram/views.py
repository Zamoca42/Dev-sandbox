from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView
from django.http import HttpRequest, HttpResponse, Http404
from django.shortcuts import get_object_or_404, render
from .models import Post

# Create your views here.

def post_new(request):
    pass

#post_list = login_required(ListView.as_view(model=Post, paginate_by=10))


# @method_decorator(login_required, name='dispatch')
class PostListView(LoginRequiredMixin, ListView):
    model = Post
    paginate_by = 10

post_list = PostListView.as_view()
# /instagram/
# /instagram/1/
# /instagram/10/

# @login_required
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

# post_detail = DetailView.as_view(
#     model=Post,
#     queryset=Post.objects.filter(is_public=True))

class PostDetailView(DetailView):
    model = Post
    # queryset = Post.objects.filter(is_public=True)

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_authenticated:  # 로그인여부
            qs = qs.filter(is_public=True)
        return qs


post_detail = PostDetailView.as_view()
