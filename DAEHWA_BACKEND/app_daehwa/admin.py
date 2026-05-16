from django.contrib import admin
from .models import Usuario,Chat,Evaluacion_Inicial,Paciente,Diagnostico_Funcional,Plan_Intervencion,Cita,Registro_Sesiones,Evaluacion_Periodica
from django.contrib.auth.hashers import make_password

class UsuarioAdmin(admin.ModelAdmin):
    
    def save_model(self, request, obj, form, change):
        if obj.password and not obj.password.startswith('pbkdf2_'):
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)

admin.site.register(Usuario,UsuarioAdmin)
admin.site.register(Chat)
admin.site.register(Paciente)
admin.site.register(Evaluacion_Inicial)
admin.site.register(Diagnostico_Funcional)
admin.site.register(Plan_Intervencion)
admin.site.register(Cita)
admin.site.register(Registro_Sesiones)
admin.site.register(Evaluacion_Periodica)