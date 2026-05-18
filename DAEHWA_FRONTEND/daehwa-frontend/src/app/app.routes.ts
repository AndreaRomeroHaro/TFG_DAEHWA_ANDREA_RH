import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guards';
import { roleGuard } from './guards/role.guard';
import {ComponenteFamiliar} from './familiar/familiar.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {
    path: 'logopeda',
    canActivate: [authGuard, roleGuard('L')],
    loadComponent: () =>
      import('./logopeda/logopeda.component').then(m => m.default),
    children: [
      { path: 'pacientes', loadComponent: () =>
          import('./logopeda/paciente-logopeda/paciente-logopeda.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente', loadComponent: () =>
          import('./logopeda/paciente-home/paciente-home.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/evaluacion-inicial', loadComponent: () =>
          import('./logopeda/evaluacion-inicial/evaluacion-inicial.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/diagnostico-funcional', loadComponent: () =>
          import('./logopeda/diagnostico-funcional/diagnostico-funcional.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/plan-intervencion', loadComponent: () =>
          import('./logopeda/plan-intervencion/plan-intervencion.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/registro-sesiones', loadComponent: () =>
          import('./logopeda/registro-sesiones/registro-sesiones.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/evaluaciones-periodicas', loadComponent: () =>
          import('./logopeda/evaluaciones-periodicas/evaluaciones-periodicas.component')
            .then(m => m.default)
      },
      { path: 'paciente/:idPaciente/chat', loadComponent: () =>
          import('./logopeda/chat/chat.component')
            .then(m => m.default)
      },
      { path: 'calendario', loadComponent: () =>
          import('./logopeda/citas-logopeda/citas-logopeda.component')
            .then(m => m.default)
      },

      { path: '', redirectTo: 'pacientes', pathMatch: 'full' }
    ]
  },
  {
    path: 'familiar',
    canActivate: [authGuard, roleGuard('F')],
    children: [
      
      {
        path: '',
        loadComponent: () =>
          import('./familiar/familiar-pacientes/familiar-pacientes.component')
            .then(m => m.default)
      },

      {
        path: 'paciente/:idPaciente',
        loadComponent: () =>
          import('./familiar/familiar.component')
            .then(m => m.default)
      },

      {
        path: 'paciente/:idPaciente/diagnostico-funcional',
        loadComponent: () =>
          import('./familiar/diagnostico-funcional/diagnostico-funcional.component')
            .then(m => m.default)
      },
      {
        path: 'paciente/:idPaciente/evaluaciones-periodicas',
        loadComponent: () =>
          import('./familiar/evaluaciones-periodicas/evaluaciones-periodicas.component')
            .then(m => m.default)
      },
      {
        path: 'paciente/:idPaciente/plan-intervencion',
        loadComponent: () =>
          import('./familiar/plan-intervencion/plan-intervencion.component')
            .then(m => m.default)
      },
      {
        path: 'paciente/:idPaciente/registro-sesiones',
        loadComponent: () =>
          import('./familiar/registro-sesiones/registro-sesiones.component')
            .then(m => m.default)
      },
      {
        path: 'paciente/:idPaciente/chat',
        loadComponent: () =>
          import('./familiar/chat/chat.component')
            .then(m => m.default)
      },
      {
        path: 'paciente/:idPaciente/citas',
        loadComponent: () =>
          import('./familiar/citas-paciente/citas-paciente.component')
            .then(m => m.default)
      }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];