"use client"

import Link from "next/link"
import { ArrowRight, Car, CreditCard, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const modules = [
  {
    title: "Registro de Cuenta",
    description:
      "Cree cuentas nuevas para usuarios UTN ingresando únicamente el legajo. Los datos personales se completan automáticamente.",
    href: "/cuentas",
    icon: UserPlus,
    accent: "from-primary/10 to-primary/30",
    cta: "Abrir registro de cuenta",
  },
  {
    title: "Registro de Vehículo",
    description:
      "Asocie vehículos al estacionamiento validando DNI o legajo y verificando patente en tiempo real antes de confirmar.",
    href: "/vehiculos",
    icon: Car,
    accent: "from-emerald-100/70 to-emerald-200/40 dark:from-emerald-500/10 dark:to-emerald-500/5",
    cta: "Registrar vehículo",
  },
  {
    title: "Registrar Abono",
    description:
      "Gestione pagos de abono mensual: busque al usuario, confirme datos y registre el pago con la nueva vigencia.",
    href: "/abonos",
    icon: CreditCard,
    accent: "from-sky-100/70 to-sky-200/40 dark:from-sky-500/10 dark:to-sky-500/5",
    cta: "Registrar abono",
  },
]

export default function PortalEstacionamientoUTN() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <div className="container mx-auto grid min-h-screen max-w-6xl place-items-center px-4 py-16">
        <div className="space-y-12">
          <header className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Portal Integrado de Estacionamiento UTN
            </div>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Gestione cuentas, vehículos y abonos desde un único lugar
              </h1>
              <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
                Acceda a los tres módulos del sistema centralizado de estacionamiento de la UTN. Seleccione la operación a
                realizar para continuar con el flujo correspondiente.
              </p>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card
                key={module.href}
                className="relative overflow-hidden border-primary/20 bg-background shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${module.accent}`} />
                <CardHeader className="space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <module.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-foreground">{module.title}</CardTitle>
                  <CardDescription className="text-pretty text-base text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground/90">
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/60" />
                      Flujo guiado paso a paso
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/60" />
                      Validaciones en tiempo real
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary/60" />
                      Datos simulados para pruebas
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full group">
                    <Link href={module.href} className="flex items-center justify-center gap-2">
                      {module.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
