import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RegistroSesionService } from '../../services/registro-sesiones.service';
import { RegistroSesion } from '../../models/Registro_Sesiones';

@Component({
  selector: 'app-registro-sesiones',
  imports: [CommonModule],
  templateUrl: './registro-sesiones.component.html',
  styleUrl: './registro-sesiones.component.css',
})
export class RegistroSesionesComponent implements OnInit {

  idPaciente!:number;
  sesiones: RegistroSesion[] = [];
  cargando=true;
  error:string|null=null;
  detalleRegistro:number|null=null;

  constructor(private route: ActivatedRoute,private sesionService:RegistroSesionService,private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.idPaciente=Number(this.route.snapshot.paramMap.get('idPaciente'));
    this.cargarSesiones();
  }

  cargarSesiones():void{
    this.cargando=true;
    this.error=null;

    this.sesionService.listarRegistro_Sesiones().subscribe({
      next:(data:RegistroSesion[]) => {
        this.sesiones=data;
        this.cargando=false;
        this.cdr.detectChanges();
      },
      error:()=>{
        this.error="No se puede cargar las sesiones";
        this.cargando=false;
        this.cdr.detectChanges();
      }
    })

  }

  detalle_Registro(id: number):void{
    this.detalleRegistro=this.detalleRegistro===id?null:id;
  }
}
export default RegistroSesionesComponent;
