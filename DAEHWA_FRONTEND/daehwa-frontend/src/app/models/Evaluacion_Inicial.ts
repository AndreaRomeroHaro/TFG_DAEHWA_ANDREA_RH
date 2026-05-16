export interface EvaluacionInicial {
  id: number;
  paciente: number;
  antecedentes_clinicos: string;
  entorno_familiar: string;
  pruebas: string;
  observacion_directa: string;
  archivos_adjuntos: File | string | null;
}