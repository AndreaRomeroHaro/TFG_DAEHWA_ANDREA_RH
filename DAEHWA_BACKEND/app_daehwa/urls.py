from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet,ChatViewSet,PacienteViewSet,Evaluacion_InicialViewSet,Diagnostico_FuncionalViewSet,Plan_IntervencionViewSet,CitaViewSet,Registro_SesionesViewSet,Evaluacion_PeriodicaViewSet

router=DefaultRouter()

router.register(r'usuarios',UsuarioViewSet)
router.register(r'chats',ChatViewSet)
router.register(r'pacientes',PacienteViewSet)
router.register(r'evaluaciones-iniciales',Evaluacion_InicialViewSet)
router.register(r'diagnosticos-funcionales',Diagnostico_FuncionalViewSet)
router.register(r'planes-intervencion',Plan_IntervencionViewSet)
router.register(r'citas',CitaViewSet)
router.register(r'registro-sesiones',Registro_SesionesViewSet)
router.register(r'evaluaciones-periodicas',Evaluacion_PeriodicaViewSet)

urlpatterns=[
    path('',include(router.urls))
]