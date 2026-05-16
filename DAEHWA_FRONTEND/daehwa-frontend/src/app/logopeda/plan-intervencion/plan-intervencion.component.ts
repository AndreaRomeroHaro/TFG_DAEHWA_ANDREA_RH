import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanIntervencion } from '../../models/Plan_Intervencion';
import { PlanIntervencionService } from '../../services/plan-intervencion.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-plan-intervencion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-intervencion.component.html',
  styleUrl: './plan-intervencion.component.css',
})
export class PlanIntervencionComponent implements OnInit {

  planes: PlanIntervencion[] = [];
  mensajeError: string | null = null;

  nuevoPlan: PlanIntervencion = {
    id: 0,
    paciente: 0,
    objetivos_especificos: '',
    contenidos: '',
    frecuencia: 0,
    duracion_sesiones: 0,
  };

  detallePlan: number | null = null;
  editar = false;
  idPaciente = 0;

  constructor(
    private planService: PlanIntervencionService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.nuevoPlan.paciente = this.idPaciente;
    this.cargarPlanes();
  }

  cargarPlanes(): void {
    this.planService.listarPlanIntervencion().subscribe(planes => {
      this.planes = planes.filter(p => p.paciente === this.idPaciente);
      this.cdr.detectChanges(); 
    });
  }

  crearPlan(): void {
    const peticion = this.editar
      ? this.planService.editarPlanIntervencion(this.nuevoPlan.id, this.nuevoPlan)
      : this.planService.crearPlanIntervencion(this.nuevoPlan);

    peticion.subscribe({
      next: () => {
        this.editar = false;
        this.resetearFormulario();
        this.cargarPlanes();
      },
      error: (err) => {
        if (err.error && typeof err.error === 'object') {
          const valores = Object.values(err.error).flat();
          this.mensajeError = String(valores[0]); 
        } else {
          this.mensajeError = 'Error al guardar el plan de intervención';
        }
      }
    });
  }

  editarPlanIntervencion(id: number): void {
    this.planService.consultarPlanIntervencion(id).subscribe(plan => {
      this.nuevoPlan = { ...plan };
      this.editar = true;
    });
  }

  eliminarPlan(id: number): void {
    this.planService.eliminarPlanIntervencion(id).subscribe(() => {
      this.cargarPlanes();
    });
  }

  verDetalle(id: number): void {
    this.detallePlan = this.detallePlan === id ? null : id;
  }

  resetearFormulario(): void {
    this.nuevoPlan = {
      id: 0,
      paciente: this.idPaciente,
      objetivos_especificos: '',
      contenidos: '',
      frecuencia: 0,
      duracion_sesiones: 0,
    };
  }
}

export default PlanIntervencionComponent;