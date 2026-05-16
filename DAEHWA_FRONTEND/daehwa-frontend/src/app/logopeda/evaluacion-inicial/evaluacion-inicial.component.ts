import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaluacionInicial } from '../../models/Evaluacion_Inicial';
import { EvaluacionInicialService } from '../../services/evaluacion-inicial.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-evaluacion-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion-inicial.component.html',
  styleUrl: './evaluacion-inicial.component.css',
})
export class EvaluacionInicialComponent implements OnInit {

  evaluaciones: EvaluacionInicial[] = [];
  mensajeError: string | null = null;

  nuevaEvaluacion: EvaluacionInicial = {
    id: 0,
    paciente: 0,
    antecedentes_clinicos: '',
    entorno_familiar: '',
    pruebas: '',
    observacion_directa: '',
    archivos_adjuntos: null
  };

  evaluacionDetalle: number | null = null;
  editar = false;
  idPaciente = 0;

  constructor(
    private evaluacionServicio: EvaluacionInicialService,
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
    });
  }

  subirArchivos(event: any): void {
    const archivo = event.target.files[0];
    this.nuevaEvaluacion.archivos_adjuntos = archivo;
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
          this.mensajeError = 'Error al guardar la evaluación periodicas';
        }
      }
    });
  }

  editarEvaluacion(id: number): void {
    this.evaluacionServicio.consultarEvaluacion(id).subscribe(evaluacion => {
    this.nuevaEvaluacion = 
      {
        id: evaluacion.id,
        paciente: evaluacion.paciente,
        antecedentes_clinicos: evaluacion.antecedentes_clinicos,
        entorno_familiar: evaluacion.entorno_familiar,
        pruebas: evaluacion.pruebas,
        observacion_directa: evaluacion.observacion_directa,
        archivos_adjuntos: null 
      };

      this.editar = true;
    });
  }

  eliminarEvaluacion(id: number): void {
    this.evaluacionServicio.eliminarEvaluacion(id).subscribe(() => {
      this.cargarEvaluaciones();
    });
  }

  detalleEvaluacion(id: number): void {
    this.evaluacionDetalle = this.evaluacionDetalle === id ? null : id;
  }

  resetearFormulario(): void {
    this.nuevaEvaluacion = {
      id: 0,
      paciente: this.idPaciente,
      antecedentes_clinicos: '',
      entorno_familiar: '',
      pruebas: '',
      observacion_directa: '',
      archivos_adjuntos: null
    };
  }
}

export default EvaluacionInicialComponent;
