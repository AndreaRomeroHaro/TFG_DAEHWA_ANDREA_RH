from rest_framework import viewsets
from .models import Usuario,Chat,Evaluacion_Inicial,Paciente,Diagnostico_Funcional,Plan_Intervencion,Cita,Registro_Sesiones,Evaluacion_Periodica
from .serializers import UsuarioSerializer,ChatSerializer,Evaluacion_InicialSerializer,Diagnostico_FuncionalSerializer,Plan_IntervencionSerializer,CitaSerializer,Registro_SesionesSerializer,PacienteSerializer,TokenPersonalizado,Evaluacion_PeriodicaSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class=UsuarioSerializer
    queryset=Usuario.objects.all()

    def get_queryset(self):
        user=self.request.user
        return Usuario.objects.filter(id=user.id)

class ChatViewSet(viewsets.ModelViewSet):
    serializer_class=ChatSerializer
    queryset=Chat.objects.all()

    def get_queryset(self):
        user=self.request.user
        return Chat.objects.filter(emisor=user) | Chat.objects.filter(receptor=user)

class PacienteViewSet(viewsets.ModelViewSet):
    serializer_class=PacienteSerializer
    queryset=Paciente.objects.all()

    def get_queryset(self):
        user=self.request.user
        if user.rol== 'L':
            return Paciente.objects.filter(logopeda_asignado=user)
        if user.rol=='F':
            return Paciente.objects.filter(familiar=user)
        return Paciente.objects.none()
    
class Evaluacion_InicialViewSet(viewsets.ModelViewSet):
    queryset=Evaluacion_Inicial.objects.all()
    serializer_class=Evaluacion_InicialSerializer

class Diagnostico_FuncionalViewSet(viewsets.ModelViewSet):
    queryset=Diagnostico_Funcional.objects.all()
    serializer_class=Diagnostico_FuncionalSerializer

class Evaluacion_PeriodicaViewSet(viewsets.ModelViewSet):
    queryset=Evaluacion_Periodica.objects.all()
    serializer_class=Evaluacion_PeriodicaSerializer

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'L':
            return Evaluacion_Periodica.objects.filter(paciente__logopeda_asignado=user)
        return Evaluacion_Periodica.objects.filter(paciente__familiar=user)

class Plan_IntervencionViewSet(viewsets.ModelViewSet):
    queryset=Plan_Intervencion.objects.all()
    serializer_class=Plan_IntervencionSerializer

class CitaViewSet(viewsets.ModelViewSet):
    serializer_class=CitaSerializer
    queryset=Cita.objects.all()

    def get_queryset(self):
        user=self.request.user
        if user.rol=='L':
            return Cita.objects.filter(id_usuario_logopeda=user)
        if user.rol=='F':
            return Cita.objects.filter(paciente__familiar=user)
        return Cita.objects.none()

class Registro_SesionesViewSet(viewsets.ModelViewSet):
    serializer_class=Registro_SesionesSerializer
    queryset=Registro_Sesiones.objects.all()
    
    def get_queryset(self):
        user=self.request.user
        if user.rol=='L':
            return Registro_Sesiones.objects.filter(paciente__logopeda_asignado=user)
        return Registro_Sesiones.objects.filter(paciente__familiar=user) 
    
class LoginPersonalizadoView(TokenObtainPairView):
    serializer_class=TokenPersonalizado