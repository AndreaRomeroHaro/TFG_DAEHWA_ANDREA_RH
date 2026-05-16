from rest_framework import serializers
from django.utils import timezone
from .models import Usuario,Chat,Evaluacion_Inicial,Paciente,Diagnostico_Funcional,Plan_Intervencion,Cita,Registro_Sesiones,Evaluacion_Periodica
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model=Usuario
        fields=['id','nombre','email','rol','foto_usuario']

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chat
        fields="__all__"
    
    def validate(self,data):
        emisor=data.get('emisor')
        receptor=data.get('receptor')

        if emisor and receptor:
            if emisor ==receptor:
                raise serializers.ValidationError("No puedes enviarte mensajes a ti mismo.")
        return data


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paciente
        fields='__all__'
    
    def validate_fecha_nacimiento(self,value):
        if value>timezone.now().date():
            raise serializers.ValidationError("La fecha de nacimiento no puede ser posterior a la fecha actual.")
        return value
    
class Evaluacion_InicialSerializer(serializers.ModelSerializer):
    class Meta:
        model=Evaluacion_Inicial
        fields="__all__"

class Diagnostico_FuncionalSerializer(serializers.ModelSerializer):
    class Meta:
        model=Diagnostico_Funcional
        fields="__all__"

    def validate(self, data):
        if not data.get("diagnostico_funcional"):
            raise serializers.ValidationError({"detalle": "Debes introducir un diagnóstico funcional."})
        return data

class Plan_IntervencionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Plan_Intervencion
        fields="__all__"

class Evaluacion_PeriodicaSerializer(serializers.ModelSerializer):
    class Meta:
        model=Evaluacion_Periodica
        fields="__all__"

class CitaSerializer(serializers.ModelSerializer):

    paciente = serializers.PrimaryKeyRelatedField(
        queryset=Paciente.objects.all(),
        error_messages={  "does_not_exist": "El paciente seleccionado no existe."})

    class Meta:
        model=Cita
        fields="__all__"

    def validate_fecha_inicio(self,value):
        if value<timezone.now():
            raise serializers.ValidationError("La fecha de inicio de la cita no puede ser anterior a la fecha actual.")
        return value
    
    def validate(self,data):
        fecha_inicio=data.get('fecha_inicio')
        fecha_fin=data.get('fecha_fin')

        if fecha_inicio and fecha_fin:
            if fecha_fin <=fecha_inicio:
                raise serializers.ValidationError("La fecha de finalización debe ser posterior a la fecha de inicio")
        return data
        
class Registro_SesionesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Registro_Sesiones
        fields="__all__"

class TokenPersonalizado(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)
        token['nombre']=user.nombre
        token['rol']=user.rol
        token['email']=user.email
        return token