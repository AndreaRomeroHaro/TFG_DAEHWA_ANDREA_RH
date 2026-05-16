import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitaService } from '../../services/citas.service';
import { Cita } from '../../models/Cita';

@Component({
  selector: 'app-citas-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas-paciente.component.html',
  styleUrl: './citas-paciente.component.css',
})
export class CitasPacienteComponent implements OnInit {

  citas: any[] = [];
  detalleCita: number | null = null;
  idPaciente!: number;
  mensajeError: string | null = null;

  constructor(
    private citasServicio: CitaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasServicio.listarCita().subscribe({
      next: (data: Cita[]) => {

        this.citas = data
          .filter(cita => {
            const id = Number(
              (cita as any).id_paciente ??
              (cita as any).paciente ??
              (cita as any).paciente_id
            );
            return id === this.idPaciente;
          })
          .map(cita => ({
            ...cita,
            estadoVisual: this.calcularEstadoVisual(cita)
          }))
          .sort((a, b) =>
            new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime()
          );

        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = "Ocurrió un error al cargar las citas.";
      }
    });
  }

  calcularEstadoVisual(cita: any) {

    const ahora = new Date().getTime();
    const inicio = new Date(cita.fecha_inicio).getTime();
    const fin = new Date(cita.fecha_fin).getTime();

    if (ahora < inicio) return { texto: 'Pendiente', clase: 'bg-primary' };
    if (ahora >= inicio && ahora <= fin) return { texto: 'En curso', clase: 'bg-success' };
    return { texto: 'Finalizada', clase: 'bg-secondary' };
  }

  detalle_Cita(id: number): void {
    this.detalleCita = this.detalleCita === id ? null : id;
  }

  cancelarCita(id: number): void {
    this.citasServicio.cancelarCita(id).subscribe({
      next: () => {
        this.cargarCitas();
      },
      error: () => {
        this.mensajeError = "Hubo un problema al cancelar la cita.";
        this.cdr.detectChanges();
      }
    });
  }
}

export default CitasPacienteComponent;
