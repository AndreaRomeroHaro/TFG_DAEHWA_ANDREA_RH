import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthUserService } from "../services/authuser.service";

@Component({
    selector: 'app-login',
    standalone:true,
    imports: [CommonModule,FormsModule],
    templateUrl:'./login.component.html',
    styleUrl:'./login.component.css'
})
export class LoginComponent{
    username='';
    password='';
    error='';

    constructor(private auth:AuthUserService, private router:Router){}
        login() {
        this.auth.login(this.username, this.password).subscribe({
            next: (res) => {
                
                const usuarioGuardado = this.auth.obtenerUsuarioActual();
                const rol = usuarioGuardado.rol;

                console.log("Rol detectado:", rol);

                if (rol === 'L') {
                    this.router.navigate(['/logopeda']);
                } else if (rol === 'F') {
                    this.router.navigate(['/familiar']);
                } else {
                    this.error= "El rol no se reconoce en el token";
                }
            },
            error: () => {
                this.error = 'Usuario o contraseña incorrectos';
            }
        });
    }

}