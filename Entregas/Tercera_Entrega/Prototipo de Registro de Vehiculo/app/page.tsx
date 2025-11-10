import { RegistroVehiculoForm } from "@/components/registro-vehiculo-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <svg className="h-8 w-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {"Sistema de Estacionamiento"}
            </h1>
            <p className="mt-2 text-pretty text-lg text-muted-foreground">{"Universidad Tecnológica Nacional"}</p>
          </div>

          {/* Form Card */}
          <div className="rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/50 px-6 py-4">
              <h2 className="text-xl font-semibold text-card-foreground">{"Registro de Vehículo"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {"Complete los datos del usuario y del vehículo a registrar"}
              </p>
            </div>
            <div className="p-6">
              <RegistroVehiculoForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
