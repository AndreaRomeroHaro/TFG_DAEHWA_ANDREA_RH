import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DiagnosticoFuncional } from '../../models/Diagnostico_Funcional';
import { DiagnosticoFuncionalService } from '../../services/diagnostico-funcional.service';

@Component({
  selector: 'app-diagnostico-funcional',
  imports: [CommonModule],
  templateUrl: './diagnostico-funcional.component.html',
  styleUrl: './diagnostico-funcional.component.css',
})
export class DiagnosticoFuncionalComponent implements OnInit{
    idPaciente!:number;
    diagnostico:DiagnosticoFuncional|null=null;
    cargando=true;
    error:string|null=null;
  
    constructor(private route: ActivatedRoute,private diagnosticoService:DiagnosticoFuncionalService,private cdr: ChangeDetectorRef){}
  
    ngOnInit(): void {
      this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
      this.cargarSesiones();
      this.cargando=false;   
    }
  
    cargarSesiones():void{
      this.cargando=true;
      this.error=null;
  
      this.diagnosticoService.listarDiagnostico().subscribe({
      next: (data) => {
        this.diagnostico = data.find(d => d.paciente === this.idPaciente) || null;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = "No se puede cargar el diagnóstico";
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });

  
    }
}
export default DiagnosticoFuncionalComponent;