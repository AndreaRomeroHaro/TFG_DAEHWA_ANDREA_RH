import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionPeriodica } from '../../models/Evaluaciones_Periodicas';
import { EvaluacionPeriodicaService } from '../../services/evaluaciones-periodica.service';
import { Chart } from 'chart.js/auto';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-evaluaciones-periodicas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluaciones-periodicas.component.html',
  styleUrl: './evaluaciones-periodicas.component.css',
})
export class EvaluacionesPeriodicasComponent implements OnInit {

  evaluaciones: EvaluacionPeriodica[] = [];
  mensajeError: string | null = null;

  nuevaEvaluacion: EvaluacionPeriodica = {
    id: 0,
    paciente: 0,
    fecha: '',
    areas: '',
    instrumentos: '',
    cambios: '',
    puntuacion: 0
  };

  evaluacionDetalle: number | null = null;
  grafica: Chart | null = null;
  editar = false;
  idPaciente = 0;

  constructor(
    private evaluacionServicio: EvaluacionPeriodicaService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.nuevaEvaluacion.paciente = this.idPaciente;
    this.cargarEvaluaciones();
  }

  cargarEvaluaciones(): void {
    this.evaluacionServicio.listarEvaluacion().subscribe(data => {
      this.evaluaciones = data.filter(e => e.paciente === this.idPaciente);
      this.cdr.detectChanges();
      
      if (this.evaluaciones.length > 0) {
        setTimeout(() => this.generarGrafica(), 100); 
      }
    });
  }

  crearEvaluacion(): void {
    const peticion = this.editar
      ? this.evaluacionServicio.editarEvaluacion(this.nuevaEvaluacion.id, this.nuevaEvaluacion)
      : this.evaluacionServicio.crearEvaluacion(this.nuevaEvaluacion);

    peticion.subscribe({
      next: () => {
        this.editar = false;
        this.resetearFormulario();
        this.cargarEvaluaciones();
      },
      error: (err) => {
        if (err.error && typeof err.error === 'object') {
          const valores = Object.values(err.error).flat();
          this.mensajeError = String(valores[0]); 
        } else {
          this.mensajeError = 'Error al guardar las evaluaciones periodicas';
        }
      }
    });
  }

  editarEvaluacion(id: number): void {
    this.evaluacionServicio.consultarEvaluacion(id).subscribe(evaluacion => {
      this.nuevaEvaluacion = { ...evaluacion };
      this.editar = true;
    });
  }

  eliminarEvaluacion(id: number): void {
    this.evaluacionServicio.eliminarEvaluacion(id).subscribe(() => {
      this.cargarEvaluaciones();
    });
  }

  detallesEvaluacion(id: number): void {
    this.evaluacionDetalle = this.evaluacionDetalle === id ? null : id;
  }

  resetearFormulario(): void {
    this.nuevaEvaluacion = {
      id: 0,
      paciente: this.idPaciente,
      fecha: '',
      areas: '',
      instrumentos: '',
      cambios: '',
      puntuacion: 0
    };
  }

  generarGrafica() {
    const ejeXFecha = this.evaluaciones.map(e => new Date(e.fecha).toLocaleDateString());
    const ejeYPuntuacion = this.evaluaciones.map(e => e.puntuacion);

    if (this.grafica) {
      this.grafica.destroy();
    }

    this.grafica = new Chart('graficaEvolucion', {
      type: 'line',
      data: {
        labels: ejeXFecha,
        datasets: [
          {
            label: 'Puntuación',
            data: ejeYPuntuacion,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.3
          }
        ]
      }
    });
  }
}

export default EvaluacionesPeriodicasComponent;
