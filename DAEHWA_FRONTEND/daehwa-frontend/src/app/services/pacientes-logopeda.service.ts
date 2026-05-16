import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthUserService } from "./authuser.service";
import { Paciente } from "../models/Paciente";

@Injectable({
    providedIn:'root'
})

export class PacienteLogopedaService{

    constructor(private http:HttpClient,private authUser:AuthUserService){}

    obtenerPacientes(): Observable<Paciente[]> {
      return this.http.get<Paciente[]>('http://127.0.0.1:8000/api/pacientes/');
  }

  obtenerPaciente(idPaciente: number): Observable<Paciente> {
      return this.http.get<Paciente>(`http://127.0.0.1:8000/api/pacientes/${idPaciente}/`);
  }

}