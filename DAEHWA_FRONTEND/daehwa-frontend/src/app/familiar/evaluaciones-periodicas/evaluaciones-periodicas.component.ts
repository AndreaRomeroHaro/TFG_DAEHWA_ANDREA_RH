import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EvaluacionPeriodicaService } from '../../services/evaluaciones-periodica.service';
import { EvaluacionPeriodica } from '../../models/Evaluaciones_Periodicas';

@Component({
  selector: 'app-evaluaciones-periodicas',
  imports: [CommonModule],
  templateUrl: './evaluaciones-periodicas.component.html',
  styleUrl: './evaluaciones-periodicas.component.css',
})
export class EvaluacionesPeriodicasComponent implements OnInit{

  idPaciente!:number;
  evaluaciones:EvaluacionPeriodica[]=[];
  cargando=true;
  error:string|null=null;
  detalleEvaluacion:number|null=null;

  constructor(private route: ActivatedRoute,private evaluacionService:EvaluacionPeriodicaService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
      this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
      this.cargarSesiones();
  }

  cargarSesiones():void{
    this.cargando=true;
    this.error=null;

    this.evaluacionService.listarEvaluacion().subscribe({
    next: (data) => {
      this.evaluaciones = data.filter(e => e.paciente === this.idPaciente);
      this.cargando = false;
      this.cdr.detectChanges();
    },
    error: () => {
      this.error = "No se pueden cargar las evaluaciones";
      this.cargando = false;
      this.cdr.detectChanges();
    }
  });


  }

  detalle_Registro(id: number):void{
    this.detalleEvaluacion=this.detalleEvaluacion===id?null:id;
  }

}
export default EvaluacionesPeriodicasComponent;