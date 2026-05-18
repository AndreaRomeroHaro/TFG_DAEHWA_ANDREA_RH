import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-familiar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './familiar.component.html',
  styleUrls: ['./familiar.component.css']
})
export class ComponenteFamiliar implements OnInit {

  idPaciente!: number;

  opciones = [
    { titulo: 'Diagnóstico funcional', ruta: 'diagnostico-funcional' },
    { titulo: 'Evaluaciones periódicas', ruta: 'evaluaciones-periodicas'},
    { titulo: 'Plan de intervención', ruta: 'plan-intervencion'},
    { titulo: 'Registro de sesiones', ruta: 'registro-sesiones' },
    { titulo: 'Chat con logopeda', ruta: 'chat'},
    { titulo: 'Citas', ruta: 'citas'}
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));
  }
}
export default ComponenteFamiliar;