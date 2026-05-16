import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../models/Paciente';
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';

@Component({
  selector: 'app-paciente-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-home.component.html',
  styleUrl: './paciente-home.component.css',
})
export class PacienteHomeComponent implements OnInit { 

  idPaciente = 0;
  paciente: Paciente | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteLogopedaService
  ) {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
  }

  ngOnInit(): void {
    this.pacienteService.obtenerPaciente(this.idPaciente)
      .subscribe(p => this.paciente = p);
  }

  ir(ruta: string) {
    this.router.navigate([`/logopeda/paciente/${this.idPaciente}/${ruta}`]);
  }
}
export default PacienteHomeComponent;
