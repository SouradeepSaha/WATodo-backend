from django.urls import include, path
from rest_framework import routers
from todo.views import MemberViewSet, TaskViewSet, TagViewSet

router = routers.DefaultRouter()
router.register(r'Member', MemberViewSet)

urlpatterns = [
   path('', include(router.urls)),
]
