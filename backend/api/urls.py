from django.urls import path
from .views import (
    register_user,
    login_user,
    SweetListCreateView,
    SweetDetailView,
    search_sweets,
    purchase_sweet,
)

urlpatterns = [
    path("auth/register/", register_user, name="register"),
    path("auth/login/", login_user, name="login"),
    path("sweets/", SweetListCreateView.as_view(), name="sweet-list"),
    path("sweets/<int:pk>/", SweetDetailView.as_view(), name="sweet-detail"),
    path("sweets/search/", search_sweets, name="search-sweets"),
    path("sweets/purchase/<int:sweet_id>/", purchase_sweet, name="purchase-sweet"),
    path("sweets/<int:sweet_id>/purchase/", purchase_sweet, name="purchase-sweet"),

]
