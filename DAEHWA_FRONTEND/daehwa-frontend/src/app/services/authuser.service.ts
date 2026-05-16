import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject,tap } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class AuthUserService{

    private apiUrl='http://127.0.0.1:8000/api/token/';

    private usuarioSubject = new BehaviorSubject<any>(null);
    usuario$=this.usuarioSubject.asObservable();

    constructor (private http: HttpClient){}

    login(username: string, password: string) {
        return this.http.post<any>(this.apiUrl, { username, password }).pipe(
        tap(res => {
            localStorage.setItem('access', res.access);
            localStorage.setItem('refresh', res.refresh);

            const payloadBase64 = res.access.split('.')[1];
            const payloadDecoded = JSON.parse(atob(payloadBase64));
            localStorage.setItem('id_usuario', payloadDecoded.user_id); 

            const usuario = {
            username: username,
            rol: payloadDecoded.rol 
            };

            this.usuarioSubject.next(usuario);
            localStorage.setItem('usuario', JSON.stringify(usuario));
        })
        );
    }


    cargarUsuarioDesdeStorage(){
        const usuario=localStorage.getItem('usuario');
        if(usuario){
            this.usuarioSubject.next(JSON.parse(usuario));
        }
    }

    obtenerUsuarioActual(){
        return this.usuarioSubject.value;
    }

    logout(){
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }

    estaLogeado():boolean{
        return !!localStorage.getItem('access');
    }

    getToken(){
        return localStorage.getItem('access');
    }

    getUsuarioId():number{
        const id=localStorage.getItem('id_usuario');
        return id?Number(id):0;
    }
}