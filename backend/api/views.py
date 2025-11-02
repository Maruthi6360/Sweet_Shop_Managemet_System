from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Sweet, Shop
from .serializers import SweetSerializer, RegisterSerializer

@api_view(["POST"])
@permission_classes([permissions.AllowAny])   # ✅ allow without login
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get("username")

        # Prevent duplicate username
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "User already exists! Please log in."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()
        return Response({"message": "User registered successfully!"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#  Login (open to everyone)
@api_view(["POST"])
@permission_classes([permissions.AllowAny])  # ✅ Anyone can log in
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    })


#  Owner Sweet Management
class SweetListCreateView(generics.ListCreateAPIView):
    serializer_class = SweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # If shop owner → show only their sweets, else → show all sweets
        if hasattr(self.request.user, "shop"):
            return Sweet.objects.filter(shop=self.request.user.shop)
        return Sweet.objects.all()

    def perform_create(self, serializer):
        if hasattr(self.request.user, "shop"):
            serializer.save(shop=self.request.user.shop)
        else:
            raise PermissionError("Only shop owners can add sweets.")


#  Sweet Details (Update/Delete)
class SweetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        sweet = self.get_object()
        # Only shop owner can update their own sweet
        if sweet.shop.owner != self.request.user:
            raise PermissionError("You are not allowed to edit this sweet.")
        serializer.save()

    def perform_destroy(self, instance):
        # Only shop owner can delete their own sweet
        if instance.shop.owner != self.request.user:
            raise PermissionError("You are not allowed to delete this sweet.")
        instance.delete()


#  Search sweets (visible to everyone logged in)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def search_sweets(request):
    query = request.GET.get("q", "")
    sweets = Sweet.objects.filter(name__icontains=query)
    return Response(SweetSerializer(sweets, many=True).data)


# Purchase sweet (customer)
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def purchase_sweet(request, sweet_id):
    try:
        sweet = Sweet.objects.get(id=sweet_id)
        if sweet.quantity > 0:
            sweet.quantity -= 1
            sweet.save()
            return Response({"message": f"You purchased {sweet.name}!"})
        else:
            return Response({"error": "Out of stock!"}, status=400)
    except Sweet.DoesNotExist:
        return Response({"error": "Sweet not found!"}, status=404)
