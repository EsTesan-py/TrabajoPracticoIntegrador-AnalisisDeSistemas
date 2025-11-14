"use client"

import type { Usuario } from "@/lib/abonos/types"

interface UserConfirmationProps {
  usuario: Usuario
  onConfirmar: () => void
  onCancelar: () => void
}

export default function UserConfirmation({ usuario, onConfirmar, onCancelar }: UserConfirmationProps) {
  const formatoFecha = (fecha: string | null) => {
    if (!fecha) return "No tiene vigencia activa"
    return new Date(fecha).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Confirmación de Datos</h2>
        <p className="mt-2 text-gray-600">Verifique que los datos sean correctos</p>
      </div>

      <div className="rounded-lg bg-gray-50 border border-gray-200 p-6 mb-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <p className="text-lg text-gray-900">
              {usuario.nombre} {usuario.apellido}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{usuario.tipoDocumento}</label>
            <p className="text-lg text-gray-900">{usuario.documento}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <p className="text-gray-900">{usuario.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Cuenta</label>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-full bg-green-500"></span>
            <p className="text-gray-900 font-medium">Abono Mensual</p>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-lg border-l-4 border-l-blue-600 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">Monto del Abono Mensual</p>
        <p className="text-3xl font-bold text-blue-600">${usuario.montoAbono.toLocaleString("es-AR")}</p>
        <p className="mt-2 text-sm text-blue-800">Vigencia actual: {formatoFecha(usuario.vigenciaHasta)}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onConfirmar}
          className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 transition-colors"
        >
          Confirmar y Continuar
        </button>
        <button
          onClick={onCancelar}
          className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-900 hover:bg-gray-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}



