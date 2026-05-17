export interface Paciente {
  id: number;
  nombre: string;
  apellidos: string;
  fecha_nacimiento: string;
  logopeda_asignado: number | null;
  familiar: number;
}
