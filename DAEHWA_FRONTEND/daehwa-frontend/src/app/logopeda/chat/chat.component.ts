import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../services/authuser.service';
import { PacienteLogopedaService } from '../../services/pacientes-logopeda.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {

  mensajes: any[] = [];
  mensajeNuevo = '';
  mensajeError: string | null = null;

  idPaciente = 0;
  idFamiliar = 0;     
  idLogopeda = 0; 

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private authUserService: AuthUserService,
    private pacienteService: PacienteLogopedaService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.idLogopeda = this.authUserService.getUsuarioId();
    this.idPaciente = Number(this.route.snapshot.paramMap.get('idPaciente'));

    this.pacienteService.obtenerPaciente(this.idPaciente).subscribe({
      next: (paciente) => {
        this.idFamiliar = paciente.familiar || 0;         
        this.cargarMensajes(); 
      },
      error: () => {
          this.mensajeError = 'Error al cargar el paciente.';
      }
    });
  }

  cargarMensajes(): void {
    this.chatService.obtenerMensajes().subscribe(todosMisMensajes => {
      this.mensajes = todosMisMensajes.filter(m => 
        (m.emisor === this.idLogopeda && m.receptor === this.idFamiliar) ||
        (m.emisor === this.idFamiliar && m.receptor === this.idLogopeda)
      );

      this.mensajes.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
      this.cdr.detectChanges(); 
    });
  }

  enviarMensaje(): void {
    if (!this.mensajeNuevo.trim()) return;

    const mensaje = {
      emisor: this.idLogopeda,
      receptor: this.idFamiliar,
      texto: this.mensajeNuevo,
    };

    this.chatService.enviarMensaje(mensaje).subscribe({
      next: () => {
        this.mensajeNuevo = '';
        this.cargarMensajes(); 
      },
      error: () => {
          this.mensajeError = 'Error al enviar un mensaje';
      }
    });
  }
}
export default ChatComponent;
