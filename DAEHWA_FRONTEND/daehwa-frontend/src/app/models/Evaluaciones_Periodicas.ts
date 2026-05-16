export interface EvaluacionPeriodica {
  id: number;
  paciente: number;
  fecha: string;
  areas: string;
  instrumentos: string;
  cambios: string;
  puntuacion: number;
}