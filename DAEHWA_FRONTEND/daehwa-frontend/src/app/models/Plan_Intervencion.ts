export interface PlanIntervencion {
  id: number;
  paciente: number;
  objetivos_especificos: string;
  contenidos: string;
  frecuencia: number;
  duracion_sesiones: number;
}