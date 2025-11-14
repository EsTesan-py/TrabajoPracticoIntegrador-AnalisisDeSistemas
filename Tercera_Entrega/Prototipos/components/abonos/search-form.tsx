"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { buscarUsuario } from "@/lib/abonos/mock-data"
import type { Usuario } from "@/lib/abonos/types"

interface SearchFormProps {
  onUsuarioEncontrado: (usuario: Usuario) => void
  autoDocumento?: string
  autoTipo?: "DNI" | "LEGAJO"
}

export default function SearchForm({ onUsuarioEncontrado, autoDocumento, autoTipo }: SearchFormProps) {
  const [documento, setDocumento] = useState("")
  const [tipoDocumento, setTipoDocumento] = useState<"DNI" | "LEGAJO">("DNI")
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (!autoDocumento) return
    setTipoDocumento(autoTipo ?? "DNI")
    setDocumento(autoDocumento)
    setError("")
    setCargando(true)
    setTimeout(() => {
      const usuario = buscarUsuario(autoDocumento)
      if (!usuario) {
        setError("No se encontró usuario con este documento")
        setCargando(false)
        return
      }
      if (usuario.tipoAbono !== "ABONO") {
        setError('Este usuario no tiene tipo de cuenta "Abono"')
        setCargando(false)
        return
      }
      onUsuarioEncontrado(usuario)
      setCargando(false)
    }, 100)
    // solo una vez al montar con autoDocumento
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDocumento])

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setCargando(true)

    // Simular búsqueda
    setTimeout(() => {
      if (!documento.trim()) {
        setError("Por favor ingrese un número de documento o legajo")
        setCargando(false)
        return
      }

      const usuario = buscarUsuario(documento)

      if (!usuario) {
        setError("No se encontró usuario con este documento")
        setCargando(false)
        return
      }

      if (usuario.tipoAbono !== "ABONO") {
        setError('Este usuario no tiene tipo de cuenta "Abono"')
        setCargando(false)
        return
      }

      onUsuarioEncontrado(usuario)
      setCargando(false)
    }, 500)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Registrar Abono</h2>
        <p className="mt-2 text-gray-600">Ingrese su número de Documento Nacional de Identidad (DNI) o número de Legajo</p>
      </div>

      <form onSubmit={handleBuscar} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
          <div className="flex gap-4">
            {(["DNI", "LEGAJO"] as const).map((tipo) => (
              <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={tipo}
                  checked={tipoDocumento === tipo}
                  onChange={() => setTipoDocumento(tipo)}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-gray-700">{tipo}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="documento" className="block text-sm font-medium text-gray-700 mb-2">
            {tipoDocumento === "DNI" ? "Número de DNI" : "Número de Legajo"}
          </label>
          <input
            id="documento"
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder={tipoDocumento === "DNI" ? "Ej: 40123456" : "Ej: L2024001"}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {cargando ? "Buscando..." : "Buscar Usuario"}
        </button>
      </form>

      <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">Ejemplos para probar:</p>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>DNI: 40123456 o 38987654</li>
          <li>Legajo: L2024001 o L2024002</li>
        </ul>
      </div>
    </div>
  )
}



