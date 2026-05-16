import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PacienteLogopedaService } from '../services/pacientes-logopeda.service';

@Component({
  selector: 'app-familiar',
  imports: [CommonModule, RouterModule],
  templateUrl: './familiar.component.html',
  styleUrl: './familiar.component.css',
})
export class ComponenteFamiliar implements OnInit {
  idPaciente = 0;
  cargando = true;

  opciones = [
    { titulo: 'Diagnóstico funcional', ruta: 'diagnostico-funcional' },
    { titulo: 'Evaluaciones periódicas', ruta: 'evaluaciones-periodicas'},
    { titulo: 'Plan de intervención', ruta: 'plan-intervencion'},
    { titulo: 'Registro de sesiones', ruta: 'registro-sesiones' },
    { titulo: 'Chat con logopeda', ruta: 'chat'},
    { titulo: 'Citas', ruta: 'citas'}
  ];

  constructor(
    private pacienteService: PacienteLogopedaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pacienteService.obtenerPacientes().subscribe({
  next: (pacientes) => {
    if (pacientes.length > 0) {
      this.idPaciente = pacientes[0].id;
    }
    this.cargando = false;
    this.cdr.detectChanges();
  },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
export default ComponenteFamiliar;
