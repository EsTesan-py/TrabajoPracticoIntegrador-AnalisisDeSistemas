"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import SearchForm from "@/components/abonos/search-form"
import UserConfirmation from "@/components/abonos/user-confirmation"
import PaymentForm from "@/components/abonos/payment-form"
import ConfirmationMessage from "@/components/abonos/confirmation-message"
import type { Usuario } from "@/lib/abonos/types"
import type { EstadoFlujo } from "@/lib/abonos/types"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AbonosPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center text-sm text-gray-600">Cargando…</div>}>
      <AbonosPageInner />
    </Suspense>
  )
}

function AbonosPageInner() {
  const [estado, setEstado] = useState<EstadoFlujo>("BUSQUEDA")
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null)
  const [vigenciaActivada, setVigenciaActivada] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const doc = searchParams.get("doc") ?? undefined
  const tipo = (searchParams.get("tipo") as "DNI" | "LEGAJO" | null) ?? undefined

  const handleUsuarioEncontrado = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario)
    setEstado("CONFIRMACION")
  }

  const handleConfirmacionExitosa = () => {
    setEstado("PAGO")
  }

  const handlePagoConfirmado = (vigencia: string) => {
    setVigenciaActivada(vigencia)
    setEstado("EXITO")
  }

  const handleRegresar = () => {
    setEstado("BUSQUEDA")
    setUsuarioSeleccionado(null)
    setVigenciaActivada(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="mx-auto max-w-2xl py-8">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              P
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Parking UTN</h1>
          </div>
          <p className="text-gray-600">Sistema de Registro de Abonos</p>
        </div>

        <div className="rounded-lg bg-white shadow-lg">
          {estado === "BUSQUEDA" && (
            <SearchForm onUsuarioEncontrado={handleUsuarioEncontrado} autoDocumento={doc} autoTipo={tipo} />
          )}

          {estado === "CONFIRMACION" && usuarioSeleccionado && (
            <UserConfirmation
              usuario={usuarioSeleccionado}
              onConfirmar={handleConfirmacionExitosa}
              onCancelar={handleRegresar}
            />
          )}

          {estado === "PAGO" && usuarioSeleccionado && (
            <PaymentForm
              usuario={usuarioSeleccionado}
              onPagoConfirmado={handlePagoConfirmado}
              onCancelar={handleRegresar}
            />
          )}

          {estado === "EXITO" && usuarioSeleccionado && vigenciaActivada && (
            <ConfirmationMessage
              usuario={usuarioSeleccionado}
              vigencia={vigenciaActivada}
              onNuevoRegistro={handleRegresar}
            />
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Sistema de Administración de Abonos - Universidad Tecnológica Nacional</p>
          <p className="mt-1">Monto mensual fijo: $2.500</p>
        </div>
      </div>
    </main>
  )
}



