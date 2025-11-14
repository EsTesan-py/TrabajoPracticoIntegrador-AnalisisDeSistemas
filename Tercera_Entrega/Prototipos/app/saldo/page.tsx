"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"

export default function SaldoPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-sm text-gray-600">Cargando…</div>}>
      <SaldoPageInner />
    </Suspense>
  )
}

function SaldoPageInner() {
  const searchParams = useSearchParams()
  const docFromQuery = searchParams.get("doc") ?? ""
  const [documento, setDocumento] = useState(docFromQuery)
  const [monto, setMonto] = useState<string>("")
  const [ok, setOk] = useState(false)

  useEffect(() => {
    setDocumento(docFromQuery)
  }, [docFromQuery])

  const handleConfirmar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!documento.trim() || !monto.trim() || Number.isNaN(Number(monto)) || Number(monto) <= 0) {
      alert("Complete documento y un monto válido mayor a 0")
      return
    }
    // Simulación de carga de saldo
    setOk(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
      <div className="mx-auto max-w-xl py-8">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        <div className="rounded-lg bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Cargar Saldo</h1>
          <p className="text-gray-600 mb-6">Impute el documento y el monto a acreditar</p>

          {!ok ? (
            <form onSubmit={handleConfirmar} className="space-y-5">
              <div>
                <label htmlFor="doc" className="block text-sm font-medium text-gray-700 mb-2">
                  Documento (DNI o Legajo)
                </label>
                <input
                  id="doc"
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-20"
                  placeholder="Ej: 40123456"
                />
              </div>
              <div>
                <label htmlFor="monto" className="block text-sm font-medium text-gray-700 mb-2">
                  Monto a cargar
                </label>
                <input
                  id="monto"
                  type="number"
                  min="1"
                  step="1"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-20"
                  placeholder="Ej: 1000"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 transition-colors"
              >
                Confirmar Carga
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                ✓
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Saldo acreditado</h2>
              <p className="text-gray-700">
                Se registró la carga de ${Number(monto).toLocaleString("es-AR")} al documento {documento}.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 hover:bg-gray-50"
                >
                  Ir al inicio
                </Link>
                <Link
                  href={`/abonos?doc=${encodeURIComponent(documento)}&tipo=DNI`}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Pagar Abono
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


