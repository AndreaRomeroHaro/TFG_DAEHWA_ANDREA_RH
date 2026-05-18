import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';
import { AuthUserService } from '../../services/authuser.service';

@Component({
  selector: 'app-familiar-pacientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './familiar-pacientes.component.html',
  styleUrls: ['./familiar-pacientes.component.css']
})
export class FamiliarPacientesComponent implements OnInit {

  pacientes: any[] = [];
  cargando = true;
  idFamiliar = 0;

  constructor(
    private pacienteService: PacienteLogopedaService,
    private authUserService: AuthUserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.idFamiliar = Number(this.authUserService.getUsuarioId());

    this.pacienteService.obtenerPacientes().subscribe({
      next: (data) => {
    
        this.pacientes = data.filter((p: any) => Number(p.familiar) === this.idFamiliar);
        
        this.cargando = false;
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}
export default FamiliarPacientesComponent;