import { Component, inject,OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { AuthUserService } from "../services/authuser.service";
import { Usuario } from "../models/usuario";

@Component({
    selector:'app-navbar',
    standalone:true,
    imports: [CommonModule, RouterLink],
    templateUrl:'./navbar.component.html',
    styleUrl:'./navbar.component.css'
})
export class ComponenteNavbar implements OnInit{
    private auth=inject(AuthUserService);
    private router=inject(Router);

    usuario: Usuario | null=null;
     ngOnInit(): void {
         this.auth.usuario$.subscribe(user=>{
            this.usuario=user;
         });
     }

    logout(){
        this.auth.logout();
        this.router.navigate(['/login']);
    }

}