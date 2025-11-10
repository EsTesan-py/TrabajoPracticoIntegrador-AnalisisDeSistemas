// Datos mock de usuarios del sistema
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
]

export const buscarUsuario = (documento: string): Usuario | null => {
  return usuariosMock.find((u) => u.documento.toUpperCase() === documento.toUpperCase()) || null
}

export const calcularVigencia = (dias = 30): string => {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().split("T")[0]
}
