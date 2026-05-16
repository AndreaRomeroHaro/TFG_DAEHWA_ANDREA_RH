import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EvaluacionInicial } from "../models/Evaluacion_Inicial";

@Injectable({ providedIn: 'root' })
export class EvaluacionInicialService {

  private enlaceApi = 'http://127.0.0.1:8000/api/evaluaciones-iniciales/';

  constructor(private http: HttpClient) {}

  crearEvaluacion(evaluacion: EvaluacionInicial): Observable<EvaluacionInicial> {

    const formData = new FormData();
    formData.append('paciente', evaluacion.paciente.toString());
    formData.append('antecedentes_clinicos', evaluacion.antecedentes_clinicos);
    formData.append('entorno_familiar', evaluacion.entorno_familiar);
    formData.append('pruebas', evaluacion.pruebas);
    formData.append('observacion_directa', evaluacion.observacion_directa);

    if (evaluacion.archivos_adjuntos instanceof File) {
      formData.append('archivos_adjuntos', evaluacion.archivos_adjuntos);
    }

    return this.http.post<EvaluacionInicial>(this.enlaceApi, formData);
  }

  editarEvaluacion(id: number, evaluacion: EvaluacionInicial): Observable<EvaluacionInicial> {

    const formData = new FormData();
    formData.append('paciente', evaluacion.paciente.toString());
    formData.append('antecedentes_clinicos', evaluacion.antecedentes_clinicos);
    formData.append('entorno_familiar', evaluacion.entorno_familiar);
    formData.append('pruebas', evaluacion.pruebas);
    formData.append('observacion_directa', evaluacion.observacion_directa);

    if (evaluacion.archivos_adjuntos instanceof File) {
      formData.append('archivos_adjuntos', evaluacion.archivos_adjuntos);
    }

    return this.http.put<EvaluacionInicial>(`${this.enlaceApi}${id}/`, formData);
  }

  consultarEvaluacion(id: number): Observable<EvaluacionInicial> {
    return this.http.get<EvaluacionInicial>(`${this.enlaceApi}${id}/`);
  }

  listarEvaluacion(): Observable<EvaluacionInicial[]> {
    return this.http.get<EvaluacionInicial[]>(this.enlaceApi);
  }

  eliminarEvaluacion(id: number) {
    return this.http.delete(`${this.enlaceApi}${id}/`);
  }
}