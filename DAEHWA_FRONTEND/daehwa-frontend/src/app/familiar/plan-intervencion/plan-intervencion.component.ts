import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlanIntervencionService } from '../../services/plan-intervencion.service';
import { PlanIntervencion } from '../../models/Plan_Intervencion';

@Component({
  selector: 'app-plan-intervencion',
  imports: [CommonModule],
  templateUrl: './plan-intervencion.component.html',
  styleUrl: './plan-intervencion.component.css',
})
export class PlanIntervencionComponent implements OnInit {

  idPaciente!: number;
  plan_intervencion: PlanIntervencion | null = null;
  cargando = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private planService: PlanIntervencionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.cargarPlan();
  }

  cargarPlan(): void {
    this.cargando = true;
    this.error = null;

    this.planService.listarPlanIntervencion().subscribe({
      next: (planes) => {
        this.plan_intervencion = planes.find(p => p.paciente === this.idPaciente) || null;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = "No se puede cargar el plan de intervención";
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}

export default PlanIntervencionComponent;
