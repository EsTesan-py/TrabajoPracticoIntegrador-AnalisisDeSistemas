"use client"

import type { Usuario } from "@/lib/abonos/types"

interface ConfirmationMessageProps {
  usuario: Usuario
  vigencia: string
  onNuevoRegistro: () => void
}

export default function ConfirmationMessage({ usuario, vigencia, onNuevoRegistro }: ConfirmationMessageProps) {
  const formatoFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Operación Exitosa</h2>
        <p className="text-lg text-green-600 font-semibold">Abono activado hasta {formatoFecha(vigencia)}</p>
      </div>

      <div className="rounded-lg bg-green-50 border border-green-200 p-6 mb-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-700">Usuario:</span>
          <span className="font-medium text-gray-900">
            {usuario.nombre} {usuario.apellido}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Documento:</span>
          <span className="font-medium text-gray-900">{usuario.documento}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Monto pagado:</span>
          <span className="font-medium text-gray-900">${usuario.montoAbono.toLocaleString("es-AR")}</span>
        </div>
        <div className="border-t border-green-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-700">Vigencia hasta:</span>
            <span className="text-lg font-bold text-green-600">{formatoFecha(vigencia)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-6">
        <p className="text-sm text-blue-900">
          El usuario puede acceder al estacionamiento hasta la fecha de vigencia indicada. Se envió una confirmación al
          email registrado.
        </p>
      </div>

      <button
        onClick={onNuevoRegistro}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Registrar Nuevo Abono
      </button>
    </div>
  )
}



