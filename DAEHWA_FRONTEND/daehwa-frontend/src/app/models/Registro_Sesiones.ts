export interface RegistroSesion {
  id: number;                    
  paciente: number;               
  fecha: string;                  
  actividades: string;
  areas_lenguaje: string;         
  logros: string | null;
  aspectos_mejorar: string | null;
  observaciones: string | null;
  multimedia: string | null;     
}
