// Tipos para el sistema de registro de abonos

export interface Usuario {
  id: string
  documento: string
  tipoDocumento: "DNI" | "LEGAJO"
  nombre: string
  apellido: string
  email: string
  tipoAbono: "ABONO" | "VISITANTE"
  montoAbono: number
  vigenciaHasta: string | null
  activo: boolean
}

export interface Pago {
  id: string
  usuarioId: string
  monto: number
  fechaPago: string
  vigenciaHasta: string
  confirmado: boolean
}

export type EstadoFlujo = "BUSQUEDA" | "CONFIRMACION" | "PAGO" | "EXITO"
