import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DiagnosticoFuncional } from '../../models/Diagnostico_Funcional';
import { DiagnosticoFuncionalService } from '../../services/diagnostico-funcional.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-diagnostico-funcional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnostico-funcional.component.html',
  styleUrl: './diagnostico-funcional.component.css',
})
export class DiagnosticoFuncionalComponent implements OnInit {

  diagnosticos: DiagnosticoFuncional[] = [];
  mensajeError: string | null = null;

  nuevoDiagnostico: DiagnosticoFuncional = {
    id: 0,
    paciente: 0,
    fecha: '',
    diagnostico_funcional: '',
    recomendaciones: ''
  };

  diagnosticoDetalle: number | null = null;
  editar = false;
  idPaciente = 0;

  constructor(
    private diagnosticoServicio: DiagnosticoFuncionalService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.nuevoDiagnostico.paciente = this.idPaciente;
    this.cargarDiagnosticos();
  }

  cargarDiagnosticos(): void {
    this.diagnosticoServicio.listarDiagnostico().subscribe(data => {
      this.diagnosticos = data.filter(d => d.paciente === this.idPaciente);
      this.cdr.detectChanges(); 
    });
  }

  transformarFecha(fecha: string): void {
    this.nuevoDiagnostico.fecha = fecha;
  }

  crearDiagnostico(): void {
  const peticion = this.editar
    ? this.diagnosticoServicio.editarDiagnostico(this.nuevoDiagnostico.id, this.nuevoDiagnostico)
    : this.diagnosticoServicio.crearDiagnostico(this.nuevoDiagnostico);

  peticion.subscribe({
    next: () => {
      this.editar = false;
      this.mensajeError = null;
      this.resetearFormulario();
      this.cargarDiagnosticos();
    },
    error: (err) => {
        if (err.error && typeof err.error === 'object') {
          const valores = Object.values(err.error).flat();
          this.mensajeError = String(valores[0]); 
        } else {
          this.mensajeError = 'Error al guardar el diagnóstico funcional';
        }
      }
  });
}

  editarDiagnostico(id: number): void {
    this.diagnosticoServicio.consultarDiagnostico(id).subscribe(diagnostico => {
      this.nuevoDiagnostico = { ...diagnostico };
      this.editar = true;
    });
  }

  eliminarDiagnostico(id: number): void {
    this.diagnosticoServicio.eliminarDiagnostico(id).subscribe(() => {
      this.cargarDiagnosticos();
    });
  }

  diagnosticosDetalle(id: number): void {
    this.diagnosticoDetalle = this.diagnosticoDetalle === id ? null : id;
  }

  resetearFormulario(): void {
    this.nuevoDiagnostico = {
      id: 0,
      paciente: this.idPaciente,
      fecha: '',
      diagnostico_funcional: '',
      recomendaciones: ''
    };
  }
}

export default DiagnosticoFuncionalComponent;
