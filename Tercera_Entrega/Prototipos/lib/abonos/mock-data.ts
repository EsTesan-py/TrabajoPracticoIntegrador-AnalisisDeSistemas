// Datos mock de usuarios del sistema de abonos
import type { Usuario } from "./types"

export const usuariosMock: Usuario[] = [
  {
    id: "1",
    documento: "40123456",
    tipoDocumento: "DNI",
    nombre: "Juan",
    apellido: "Gallo",
    email: "juan.gallo@utn.edu.ar",
    tipoAbono: "ABONO",
    montoAbono: 2500,
    vigenciaHasta: "2025-11-10",
    activo: true,
  },
  {
    id: "2",
    documento: "38987654",
    tipoDocumento: "DNI",
    nombre: "María",
    apellido: "López",
    email: "maria.lopez@utn.edu.ar",
    tipoAbono: "ABONO",
    montoAbono: 2500,
    vigenciaHasta: "2025-10-15",
    activo: true,
  },
  {
    id: "3",
    documento: "L2024001",
    tipoDocumento: "LEGAJO",
    nombre: "Carlos",
    apellido: "Martínez",
    email: "carlos.martinez@utn.edu.ar",
    tipoAbono: "ABONO",
    montoAbono: 2500,
    vigenciaHasta: null,
    activo: false,
  },
  {
    id: "4",
    documento: "L2024002",
    tipoDocumento: "LEGAJO",
    nombre: "Ana",
    apellido: "Fernández",
    email: "ana.fernandez@utn.edu.ar",
    tipoAbono: "ABONO",
    montoAbono: 2500,
    vigenciaHasta: "2025-12-01",
    activo: true,
  },
  // Añadidos para que las redirecciones desde cuentas funcionen con DNI
  { id: "5", documento: "30555111", tipoDocumento: "DNI", nombre: "Ana María", apellido: "Gómez", email: "ana.gomez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
  { id: "6", documento: "33444888", tipoDocumento: "DNI", nombre: "Luis", apellido: "Fernández", email: "luis.fernandez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
  { id: "7", documento: "42123987", tipoDocumento: "DNI", nombre: "Carolina", apellido: "Martínez", email: "carolina.martinez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
  { id: "8", documento: "38999123", tipoDocumento: "DNI", nombre: "Matías", apellido: "Suárez", email: "matias.suarez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
  { id: "9", documento: "40222111", tipoDocumento: "DNI", nombre: "Sofía", apellido: "Pérez", email: "sofia.perez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
  { id: "10", documento: "37000444", tipoDocumento: "DNI", nombre: "Julián", apellido: "López", email: "julian.lopez@utn.edu.ar", tipoAbono: "ABONO", montoAbono: 2500, vigenciaHasta: null, activo: true },
]

export const buscarUsuario = (documento: string): Usuario | null => {
  return usuariosMock.find((u) => u.documento.toUpperCase() === documento.toUpperCase()) || null
}

export const calcularVigencia = (dias = 30): string => {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().split("T")[0]
}

