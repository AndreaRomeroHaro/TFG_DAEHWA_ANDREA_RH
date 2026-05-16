import { Component, OnInit,inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthUserService } from './services/authuser.service';
import { ComponenteNavbar } from "./navbar/navbar.component";
import { ComponenteFooter } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ComponenteNavbar, ComponenteFooter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private auth=inject(AuthUserService);
  ngOnInit(): void {
      this.auth.cargarUsuarioDesdeStorage();
  }
}
