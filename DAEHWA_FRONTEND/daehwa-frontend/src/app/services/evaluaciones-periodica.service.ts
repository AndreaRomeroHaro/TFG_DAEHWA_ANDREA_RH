import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EvaluacionPeriodica } from "../models/Evaluaciones_Periodicas";

@Injectable({ providedIn: 'root' })
export class EvaluacionPeriodicaService {

  private enlaceApi = 'http://127.0.0.1:8000/api/evaluaciones-periodicas/';

  constructor(private http: HttpClient) {}

  crearEvaluacion(evaluacion: EvaluacionPeriodica): Observable<EvaluacionPeriodica> {
    return this.http.post<EvaluacionPeriodica>(this.enlaceApi, evaluacion);
  }

  editarEvaluacion(id: number, evaluacion: EvaluacionPeriodica): Observable<EvaluacionPeriodica> {
    return this.http.put<EvaluacionPeriodica>(`${this.enlaceApi}${id}/`, evaluacion);
  }

  consultarEvaluacion(id: number): Observable<EvaluacionPeriodica> {
    return this.http.get<EvaluacionPeriodica>(`${this.enlaceApi}${id}/`);
  }

  listarEvaluacion(): Observable<EvaluacionPeriodica[]> {
    return this.http.get<EvaluacionPeriodica[]>(this.enlaceApi);
  }

  eliminarEvaluacion(id: number) {
    return this.http.delete(`${this.enlaceApi}${id}/`);
  }
}
