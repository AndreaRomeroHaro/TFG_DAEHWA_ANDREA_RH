from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator
from django.conf import settings

class Usuario(AbstractUser):

    USERNAME_FIELD='username'
    REQUIRED_FIELDS=['email']

    class Roles(models.TextChoices):
        LOGOPEDA="L","Logopeda"
        FAMILIA="F","Familiar"
    
    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    nombre=models.CharField(max_length=150)
    username=models.CharField(max_length=150,unique=True)
    email=models.EmailField(unique=True)
    rol=models.CharField(max_length=1,choices=Roles.choices,default=Roles.FAMILIA)
    foto_usuario=models.ImageField(upload_to='imagenes/foto_usuario/',blank=True,null=True,validators=[FileExtensionValidator(allowed_extensions=['jpg','png','jpeg'])])

    def __str__(self):
        return f"{self.nombre} ({self.get_rol_display()})"

class Chat(models.Model):
    
    class Meta:
        verbose_name = "Chat"
        verbose_name_plural = "Chats"

    emisor=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='mensajes_enviados')
    receptor=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name="mensajes_recibidos")
    texto=models.TextField()
    fecha=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Mensaje de {self.emisor.nombre} a {self.receptor.nombre} - ({self.fecha})"
    
class Paciente(models.Model):

    class Meta:
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"

    nombre=models.CharField(max_length=200)
    apellidos=models.CharField(max_length=200)
    fecha_nacimiento=models.DateField()
    foto_paciente=models.ImageField(upload_to='imagenes/foto_paciente/',blank=True,null=True,validators=[FileExtensionValidator(allowed_extensions=['jpg','png','jpeg'])])
    logopeda_asignado=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,null=True,limit_choices_to={'rol':'L'},related_name='pacientes_asignados')
    familiar=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,limit_choices_to={'rol':'F'},related_name='familiar_registrado')

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"
    
class Evaluacion_Inicial(models.Model):

    class Meta:
        verbose_name = "Evaluacion Inicial"
        verbose_name_plural = "Evaluacion Inicial"

    paciente=models.OneToOneField(Paciente,on_delete=models.CASCADE,related_name="evaluacion_inicial")
    antecedentes_clinicos=models.TextField(blank=True,null=True)
    entorno_familiar=models.TextField(blank=True,null=True)
    pruebas=models.TextField(blank=True,null=True)
    archivos_adjuntos=models.FileField(upload_to='archivos/evaluacion_inicial/',blank=True,null=True)
    observacion_directa=models.TextField(blank=True,null=True)

    def __str__(self):
        return f"Evaluación Inicial del paciente: {self.paciente.nombre}"

class Diagnostico_Funcional(models.Model):

    class Meta:
        verbose_name = "Diagnostico Funcional"
        verbose_name_plural = "Diagnostico Funcional"

    paciente=models.OneToOneField(Paciente,on_delete=models.CASCADE,related_name="diagnostico_funcional")
    fecha=models.DateField()
    diagnostico_funcional=models.TextField(blank=True)
    recomendaciones=models.TextField(blank=True,null=True)

    def __str__(self):
        return f"Diagnóstico funcional del paciente {self.paciente.nombre}"

class Plan_Intervencion(models.Model):

    class Meta:
        verbose_name = "Plan Intervencion"
        verbose_name_plural = "Plan Intervencion"

    paciente=models.OneToOneField(Paciente,on_delete=models.CASCADE,related_name='plan_intervencion')
    objetivos_especificos=models.TextField()
    contenidos=models.TextField()
    frecuencia=models.IntegerField()
    duracion_sesiones=models.IntegerField()

    def __str__(self):
        return f"Plan de intervención del paciente {self.paciente.nombre}"

class Cita (models.Model):

    class Meta:
        verbose_name = "Cita"
        verbose_name_plural = "Citas"

    paciente=models.ForeignKey(Paciente,on_delete=models.CASCADE,related_name='citas')
    id_usuario_logopeda=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,limit_choices_to={'rol':'L'},related_name='citas_logopeda')
    fecha_inicio=models.DateTimeField()
    fecha_fin=models.DateTimeField()

    def __str__(self):
        return f"Cita de {self.paciente.nombre} el {self.fecha_inicio}"

class Registro_Sesiones(models.Model):

    class Meta:
        verbose_name = "Registro Sesion"
        verbose_name_plural = "Registro Sesiones"

    paciente=models.ForeignKey(Paciente, on_delete=models.CASCADE,related_name='sesiones')
    fecha=models.DateField()
    actividades=models.TextField()
    areas_lenguaje=models.CharField(max_length=225)
    logros=models.TextField(blank=True,null=True)
    aspectos_mejorar=models.TextField(blank=True,null=True)
    observaciones=models.TextField(blank=True, null=True)
    multimedia=models.FileField(upload_to="archivos/registro_sesiones/",blank=True,null=True)

    def __str__(self):
        return f"Registro de sesiones de {self.paciente.nombre}"

class Evaluacion_Periodica(models.Model):

    class Meta:
        verbose_name="Evaluacion Periodica"
        verbose_name_plural="Evaluacion Periodica"

    paciente=models.ForeignKey(Paciente, on_delete=models.CASCADE,related_name='evaluaciones')
    fecha=models.DateField()
    areas=models.TextField(blank=True,null=True)
    instrumentos=models.CharField(max_length=225)
    cambios=models.TextField(blank=True,null=True)
    puntuacion=models.IntegerField()

    def __str__(self):
         return f"Evaluación Periodica del paciente: {self.paciente.nombre}"
