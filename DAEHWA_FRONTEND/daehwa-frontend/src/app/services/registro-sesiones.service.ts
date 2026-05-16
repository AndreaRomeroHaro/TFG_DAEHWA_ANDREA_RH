import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { RegistroSesion } from "../models/Registro_Sesiones";

@Injectable({ providedIn: 'root' })
export class RegistroSesionService {

  private enlaceApi = 'http://127.0.0.1:8000/api/registro-sesiones/';

  constructor(private http: HttpClient) {}

  crearRegistro_Sesiones(sesion: RegistroSesion): Observable<RegistroSesion> {

    const formData = new FormData();

    formData.append('paciente', sesion.paciente.toString());
    formData.append('fecha', sesion.fecha);
    formData.append('actividades', sesion.actividades);
    formData.append('areas_lenguaje', sesion.areas_lenguaje);
    formData.append('logros', sesion.logros ?? '');
    formData.append('aspectos_mejorar', sesion.aspectos_mejorar ?? '');
    formData.append('observaciones', sesion.observaciones ?? '');


    if (sesion.multimedia) {
      formData.append('multimedia', sesion.multimedia);
    }

    return this.http.post<RegistroSesion>(this.enlaceApi, formData);
  }

  editarRegistro_Sesiones(id: number, sesion: RegistroSesion): Observable<RegistroSesion> {

    const formData = new FormData();

    formData.append('paciente', sesion.paciente.toString());
    formData.append('fecha', sesion.fecha);
    formData.append('actividades', sesion.actividades);
    formData.append('areas_lenguaje', sesion.areas_lenguaje);
    formData.append('logros', sesion.logros ?? '');
    formData.append('aspectos_mejorar', sesion.aspectos_mejorar ?? '');
    formData.append('observaciones', sesion.observaciones ?? '');

    if (sesion.multimedia) {
      formData.append('multimedia', sesion.multimedia);
    }

    return this.http.put<RegistroSesion>(`${this.enlaceApi}${id}/`, formData);
  }

  consultarRegistro_Sesiones(id: number): Observable<RegistroSesion> {
    return this.http.get<RegistroSesion>(`${this.enlaceApi}${id}/`);
  }

  listarRegistro_Sesiones(): Observable<RegistroSesion[]> {
    return this.http.get<RegistroSesion[]>(this.enlaceApi);
  }

  eliminarRegistro_Sesiones(id: number) {
    return this.http.delete(`${this.enlaceApi}${id}/`);
  }
}
