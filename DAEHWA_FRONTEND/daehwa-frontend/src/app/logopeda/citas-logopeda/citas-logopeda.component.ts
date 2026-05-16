import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/citas.service';
import { AuthUserService } from '../../services/authuser.service';

@Component({
  selector: 'app-citas-logopeda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citas-logopeda.component.html',
  styleUrl: './citas-logopeda.component.css',
})
export class CitasLogopedaComponent implements OnInit {
  
  citas: any[] = [];
  idLogopeda = 0;
  detalleCita: number | null = null;
  editar = false;
  mensajeError: string | null = null;

  nuevaCita: any = {
    id: 0,
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    paciente: 0,
    id_usuario_logopeda: 0,
    estado: 'activa'
  };

  constructor(
    private citasServicio: CitaService,
    private authUserService: AuthUserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idLogopeda = this.authUserService.getUsuarioId();
    this.cargarCitas();
    this.resetearFormulario();
  }

  cargarCitas(): void {
    this.citasServicio.listarCita().subscribe({
      next: (data) => {
        this.citas = data.map(cita => ({
          ...cita,
          estadoVisual: this.calcularEstadoVisual(cita)
        }));
        this.citas.sort((a, b) => new Date(b.fecha_inicio).getTime() - new Date(a.fecha_inicio).getTime());
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = "Ocurrió un error al cargar las citas.";
        this.cdr.detectChanges();
      }
    });
  }

  calcularEstadoVisual(cita: any): any {

    const ahora = new Date().getTime();
    const inicio = new Date(cita.fecha_inicio).getTime();
    const fin = new Date(cita.fecha_fin).getTime();

    if (ahora < inicio) return { texto: 'Pendiente', clase: 'bg-primary' };
    if (ahora >= inicio && ahora <= fin) return { texto: 'En curso', clase: 'bg-success' };
    return { texto: 'Finalizada', clase: 'bg-secondary' };
  }

  actualizarFechaInicio(fecha: string) {
    if (fecha) this.nuevaCita.fecha_inicio = new Date(fecha);
  }
  
  actualizarFechaFin(fecha: string) {
    if (fecha) this.nuevaCita.fecha_fin = new Date(fecha);
  }

  crearCita(): void {
    const paqueteParaDjango = {
      id: this.nuevaCita.id || 0,
      id_paciente: Number(this.nuevaCita.paciente),
      fecha_inicio: this.nuevaCita.fecha_inicio.toISOString(),
      fecha_fin: this.nuevaCita.fecha_fin.toISOString(),
      paciente: Number(this.nuevaCita.paciente),
      id_usuario_logopeda: Number(this.idLogopeda),
      estado: this.nuevaCita.estado
    };

    const peticion = this.editar && this.nuevaCita.id
      ? this.citasServicio.editarCita(this.nuevaCita.id, paqueteParaDjango as any)
      : this.citasServicio.crearCita(paqueteParaDjango as any);

    peticion.subscribe({
      next: () => {
        this.editar = false;
        this.mensajeError = null;
        this.resetearFormulario();
        this.cargarCitas();
      },
      error: (err) => {
        if (err.error && typeof err.error === 'object') {
          this.mensajeError = Object.values(err.error).flat().join(' ');
        } else {
          this.mensajeError = "Ocurrió un error inesperado al guardar la cita.";
        }
        this.cdr.detectChanges();
      }
    });
  }

  editarCita(id: number): void {
    this.citasServicio.consultarCita(id).subscribe(cita => {
      this.nuevaCita = { 
        ...cita,
        fecha_inicio: new Date(cita.fecha_inicio),
        fecha_fin: new Date(cita.fecha_fin)
      };
      this.editar = true;
      this.mensajeError = null;
      this.cdr.detectChanges();
    });
  }

  cancelarEdicion(): void {
    this.resetearFormulario();
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

  detalle_Cita(id: number): void {
    this.detalleCita = this.detalleCita === id ? null : id;
  }

  resetearFormulario(): void {
    this.nuevaCita = {
      id: 0,
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      paciente: 0, 
      id_usuario_logopeda: this.idLogopeda,
      estado: 'activa'
    };
    this.editar = false;
    this.mensajeError = null;
  }
}
export default CitasLogopedaComponent;