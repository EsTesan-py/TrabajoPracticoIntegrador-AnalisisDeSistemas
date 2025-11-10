"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, AlertCircle, User, CreditCard, ArrowLeft } from "lucide-react"

// DNIs predefinidos para probar validación de duplicados
const registeredDNIs = ["12345678", "87654321", "11223344"]
const registeredLegajos = ["45678", "98765", "55667"]

// Legajos válidos en el sistema de la UTN
const validUTNLegajos = ["12345", "54321", "98765", "11111", "22222", "33333", "44444", "55555", "66666", "77777"]

type UserType = "docente" | "no-docente" | "alumno" | ""
type AccountType = "cuenta-corriente" | "abono" | ""

interface FormData {
  nombre: string
  apellido: string
  dni: string
  legajo: string
  tipoUsuario: UserType
  tipoCuenta: AccountType
}

interface ValidationStatus {
  isValid: boolean | null
  message: string
}

export default function RegistroCuentaUsuario() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    dni: "",
    legajo: "",
    tipoUsuario: "",
    tipoCuenta: "",
  })

  const [legajoValidation, setLegajoValidation] = useState<ValidationStatus>({
    isValid: null,
    message: "",
  })

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [createdAccount, setCreatedAccount] = useState<FormData | null>(null)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setSuccessMessage("")
    setErrorMessage("")

    // Validar legajo en tiempo real
    if (field === "legajo") {
      validateLegajo(value)
    }
  }

  const validateLegajo = (legajo: string) => {
    if (!legajo) {
      setLegajoValidation({ isValid: null, message: "" })
      return
    }

    // Verificar si contiene solo números
    const onlyNumbers = /^\d+$/.test(legajo)

    if (!onlyNumbers) {
      setLegajoValidation({
        isValid: false,
        message: "El legajo no es válido o no se encuentra en los registros de la UTN",
      })
      return
    }

    // Verificar si el legajo existe en el sistema de la UTN
    if (validUTNLegajos.includes(legajo)) {
      setLegajoValidation({
        isValid: true,
        message: "Legajo Válido - Pertenece a la UTN",
      })
    } else {
      setLegajoValidation({
        isValid: false,
        message: "El legajo no es válido o no se encuentra en los registros de la UTN",
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessMessage("")
    setErrorMessage("")

    // Validar que todos los campos estén completos
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.dni ||
      !formData.legajo ||
      !formData.tipoUsuario ||
      !formData.tipoCuenta
    ) {
      setErrorMessage("Por favor, complete todos los campos")
      return
    }

    // Validar que el legajo sea válido
    if (!legajoValidation.isValid) {
      setErrorMessage("Error: El legajo no es válido o no se encuentra en los registros de la UTN")
      return
    }

    // Validar DNI duplicado
    if (registeredDNIs.includes(formData.dni)) {
      setErrorMessage("Error: El DNI ya se encuentra registrado")
      return
    }

    // Validar Legajo duplicado
    if (registeredLegajos.includes(formData.legajo)) {
      setErrorMessage("Error: El Legajo ya se encuentra registrado")
      return
    }

    setCreatedAccount({ ...formData })
    setShowConfirmation(true)

    // Agregar a listas de registrados (simulación)
    registeredDNIs.push(formData.dni)
    registeredLegajos.push(formData.legajo)
  }

  const handleBackToForm = () => {
    setShowConfirmation(false)
    setCreatedAccount(null)

    // Limpiar formulario
    setFormData({
      nombre: "",
      apellido: "",
      dni: "",
      legajo: "",
      tipoUsuario: "",
      tipoCuenta: "",
    })
    setLegajoValidation({ isValid: null, message: "" })
  }

  if (showConfirmation && createdAccount) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-primary/20">
          <CardHeader className="space-y-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-center">
              <div className="p-4 bg-white/20 rounded-full">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-balance">Cuenta Creada Exitosamente</CardTitle>
            <CardDescription className="text-center text-primary-foreground/90 text-balance">
              El usuario ha sido registrado en el sistema UTN
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            {/* Datos del Usuario */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">Datos del Usuario</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Nombre Completo</p>
                  <p className="text-lg font-semibold text-foreground">
                    {createdAccount.nombre} {createdAccount.apellido}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">DNI</p>
                  <p className="text-lg font-semibold text-foreground">{createdAccount.dni}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Legajo</p>
                  <p className="text-lg font-semibold text-foreground">{createdAccount.legajo}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Tipo de Usuario</p>
                  <p className="text-lg font-semibold text-foreground capitalize">
                    {createdAccount.tipoUsuario.replace("-", " ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Datos de la Cuenta */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-2 border-b border-border">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">Información de la Cuenta</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Tipo de Cuenta</p>
                  <p className="text-lg font-semibold text-foreground capitalize">
                    {createdAccount.tipoCuenta.replace("-", " ")}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Saldo Inicial</p>
                  <p className="text-3xl font-bold text-primary">$0</p>
                </div>
              </div>
            </div>

            {/* Mensaje de confirmación */}
            <Alert className="border-primary/30 bg-primary/5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertDescription className="text-foreground">
                La cuenta ha sido registrada exitosamente en el sistema. El usuario puede comenzar a operar con un saldo
                inicial de $0.
              </AlertDescription>
            </Alert>

            {/* Botón para crear otra cuenta */}
            <Button onClick={handleBackToForm} className="w-full" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Registrar Otra Cuenta
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-primary/30">
        <CardHeader className="space-y-2 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 bg-white/20 rounded-lg">
              <User className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-balance">Registro de Cuenta de Usuario</CardTitle>
          <CardDescription className="text-center text-primary-foreground/90 text-balance">
            Sistema de administración de cuentas - UTN
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Personales */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Datos Personales</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Ingrese el nombre"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => handleInputChange("apellido", e.target.value)}
                    placeholder="Ingrese el apellido"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI *</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={(e) => handleInputChange("dni", e.target.value)}
                    placeholder="Ingrese el DNI"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legajo">Legajo *</Label>
                  <Input
                    id="legajo"
                    value={formData.legajo}
                    onChange={(e) => handleInputChange("legajo", e.target.value)}
                    placeholder="Ingrese el legajo"
                  />

                  {/* Validación de Legajo en tiempo real */}
                  {legajoValidation.message && (
                    <div
                      className={`flex items-center gap-2 text-sm mt-2 ${
                        legajoValidation.isValid
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {legajoValidation.isValid ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      <span className="font-medium">{legajoValidation.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tipo de Usuario */}
            <div className="space-y-2">
              <Label htmlFor="tipoUsuario">Tipo de Usuario *</Label>
              <Select
                value={formData.tipoUsuario}
                onValueChange={(value) => handleInputChange("tipoUsuario", value as UserType)}
              >
                <SelectTrigger id="tipoUsuario">
                  <SelectValue placeholder="Seleccione el tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="docente">Docente</SelectItem>
                  <SelectItem value="no-docente">No Docente</SelectItem>
                  <SelectItem value="alumno">Alumno</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Cuenta */}
            <div className="space-y-2">
              <Label htmlFor="tipoCuenta">Tipo de Cuenta *</Label>
              <Select
                value={formData.tipoCuenta}
                onValueChange={(value) => handleInputChange("tipoCuenta", value as AccountType)}
              >
                <SelectTrigger id="tipoCuenta">
                  <SelectValue placeholder="Seleccione el tipo de cuenta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cuenta-corriente">Cuenta Corriente</SelectItem>
                  <SelectItem value="abono">Abono</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mensajes de error */}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Botón de envío */}
            <Button
              type="submit"
              className="w-full border-2 border-primary hover:border-accent bg-primary hover:bg-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              size="lg"
            >
              Crear Cuenta de Usuario
            </Button>
          </form>

          {/* Información de prueba */}
          <div className="mt-6 p-4 bg-muted rounded-lg space-y-2">
            <h4 className="font-semibold text-sm">Datos de prueba:</h4>
            <p className="text-xs text-muted-foreground">
              <strong>DNIs ya registrados:</strong> {registeredDNIs.slice(0, 3).join(", ")}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Legajos ya registrados:</strong> {registeredLegajos.slice(0, 3).join(", ")}
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Legajos válidos UTN:</strong> {validUTNLegajos.slice(0, 5).join(", ")}, ...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
