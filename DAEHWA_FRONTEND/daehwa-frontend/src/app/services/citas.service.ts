import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cita } from "../models/Cita";
import { AuthUserService } from "./authuser.service";

@Injectable({providedIn:'root'})
export class CitaService {

  private enlaceApi='http://127.0.0.1:8000/api/citas/';
  
  constructor(private http:HttpClient, private authUser:AuthUserService){}
  
  crearCita(cita:Cita):Observable<Cita>{
    return this.http.post<Cita>(this.enlaceApi,cita)
  }

  editarCita(id:number,cita:Cita):Observable<Cita>{
    return this.http.put<Cita>(`${this.enlaceApi}${id}/`, cita)
  }

  consultarCita(id:number):Observable<Cita>{
    return this.http.get<Cita>(`${this.enlaceApi}${id}/`);
  }

  listarCita():Observable<Cita[]>{
    return this.http.get<Cita[]>(this.enlaceApi);
  }

  cancelarCita(id:number){
        return this.http.delete(`${this.enlaceApi}${id}/`);
  }
}