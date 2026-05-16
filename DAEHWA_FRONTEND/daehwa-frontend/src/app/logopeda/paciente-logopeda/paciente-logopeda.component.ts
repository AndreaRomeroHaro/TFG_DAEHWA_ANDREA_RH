import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'; 
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';
import { Paciente } from '../../models/Paciente';

@Component({
  selector: 'app-paciente-logopeda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-logopeda.component.html',
  styleUrl: './paciente-logopeda.component.css',
})
export class PacienteLogopedaComponent implements OnInit {

  pacientes: Paciente[] = [];
  mensajeError: string | null = null;

  constructor(
    private pacientesService: PacienteLogopedaService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.mensajeError = null;
    this.pacientesService.obtenerPacientes().subscribe({
      next: (datos) => {
        this.pacientes = datos; 
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.mensajeError = null;
        this.mensajeError = "Error al cargar los pacientes";
      }
    });
  }

  entrarPaciente(idPaciente: number): void {
    this.router.navigate([`/logopeda/paciente/${idPaciente}`]);
  }
}
export default PacienteLogopedaComponent;
