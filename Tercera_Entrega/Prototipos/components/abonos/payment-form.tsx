"use client"

import { useState } from "react"
import type { Usuario } from "@/lib/abonos/types"
import { calcularVigencia } from "@/lib/abonos/mock-data"

interface PaymentFormProps {
  usuario: Usuario
  onPagoConfirmado: (vigencia: string) => void
  onCancelar: () => void
}

export default function PaymentForm({ usuario, onPagoConfirmado, onCancelar }: PaymentFormProps) {
  const [metodoPago, setMetodoPago] = useState("efectivo")
  const [numeroPago, setNumeroPago] = useState("")
  const [procesando, setProcesando] = useState(false)

  const handleConfirmarPago = () => {
    if (metodoPago !== "efectivo" && !numeroPago.trim()) {
      alert("Por favor ingrese el número de comprobante")
      return
    }

    setProcesando(true)

    // Simular procesamiento del pago
    setTimeout(() => {
      const vigencia = calcularVigencia(30)
      onPagoConfirmado(vigencia)
      setProcesando(false)
    }, 1500)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Procesamiento de Pago</h2>
        <p className="mt-2 text-gray-600">Confirme el pago recibido del usuario</p>
      </div>

      <div className="mb-6 rounded-lg bg-gray-50 border border-gray-200 p-6 space-y-3">
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
        <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
          <span className="text-lg font-medium text-gray-900">Monto a cobrar:</span>
          <span className="text-2xl font-bold text-green-600">${usuario.montoAbono.toLocaleString("es-AR")}</span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Método de Pago Recibido</label>
        <div className="space-y-2">
          {[
            { id: "efectivo", label: "Efectivo" },
            { id: "tarjeta", label: "Tarjeta de Débito/Crédito" },
            { id: "transferencia", label: "Transferencia Bancaria" },
          ].map((metodo) => (
            <label
              key={metodo.id}
              className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <input
                type="radio"
                value={metodo.id}
                checked={metodoPago === metodo.id}
                onChange={() => setMetodoPago(metodo.id)}
                className="h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{metodo.label}</span>
            </label>
          ))}
        </div>
      </div>

      {metodoPago !== "efectivo" && (
        <div className="mb-6">
          <label htmlFor="comprobante" className="block text-sm font-medium text-gray-700 mb-2">
            Número de Comprobante/Referencia
          </label>
          <input
            id="comprobante"
            type="text"
            value={numeroPago}
            onChange={(e) => setNumeroPago(e.target.value)}
            placeholder="Ej: 123456 o C1234567"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleConfirmarPago}
          disabled={procesando}
          className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {procesando ? "Procesando..." : "Confirmar Pago"}
        </button>
        <button
          onClick={onCancelar}
          disabled={procesando}
          className="flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-900 hover:bg-gray-300 disabled:opacity-50 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}



