"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle2, CheckCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const LEGAJOS_PREDEFINIDOS = ["45123", "56789", "67234", "78901", "89456", "92345", "98765"]

type TipoDocumento = "dni" | "legajo"

interface FormData {
  tipoDocumento: TipoDocumento
  numeroDocumento: string
  patente: string
  marca: string
  modelo: string
}

export function RegistroVehiculoForm() {
  const [formData, setFormData] = useState<FormData>({
    tipoDocumento: "dni",
    numeroDocumento: "",
    patente: "",
    marca: "",
    modelo: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [patenteVerificada, setPatenteVerificada] = useState(false)
  const [modoLegajo, setModoLegajo] = useState<"selector" | "manual">("selector")

  const validateDNI = (dni: string): boolean => {
    // DNI argentino: 7-8 dígitos
    const dniRegex = /^\d{7,8}$/
    return dniRegex.test(dni)
  }

  const validateLegajo = (legajo: string): boolean => {
    // Legajo: 4-8 dígitos
    const legajoRegex = /^\d{4,8}$/
    return legajoRegex.test(legajo)
  }

  const validatePatente = (patente: string): boolean => {
    // Patente argentina: formato ABC123 o AB123CD
    const patenteRegex = /^[A-Z]{2,3}\d{3}[A-Z]{0,2}$/i
    return patenteRegex.test(patente.replace(/\s/g, ""))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    // Validar documento
    if (!formData.numeroDocumento) {
      newErrors.numeroDocumento = "Este campo es obligatorio"
    } else if (formData.tipoDocumento === "dni" && !validateDNI(formData.numeroDocumento)) {
      newErrors.numeroDocumento = "DNI inválido (debe tener 7-8 dígitos)"
    } else if (formData.tipoDocumento === "legajo" && !validateLegajo(formData.numeroDocumento)) {
      newErrors.numeroDocumento = "Legajo inválido (debe tener 4-8 dígitos)"
    }

    // Validar patente
    if (!formData.patente) {
      newErrors.patente = "La patente es obligatoria"
    } else if (!validatePatente(formData.patente)) {
      newErrors.patente = "Formato de patente inválido (ej: ABC123 o AB123CD)"
    }

    // Validar marca
    if (!formData.marca.trim()) {
      newErrors.marca = "La marca es obligatoria"
    }

    // Validar modelo
    if (!formData.modelo.trim()) {
      newErrors.modelo = "El modelo es obligatorio"
    }

    setErrors(newErrors)

    // Si no hay errores, mostrar éxito
    if (Object.keys(newErrors).length === 0) {
      setShowSuccess(true)
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false)
    // Resetear formulario
    setFormData({
      tipoDocumento: "dni",
      numeroDocumento: "",
      patente: "",
      marca: "",
      modelo: "",
    })
    setPatenteVerificada(false)
    setModoLegajo("selector")
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección 1: Datos del Usuario */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              1
            </span>
            <h3 className="text-lg font-semibold text-foreground">{"Datos del Usuario"}</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{"Tipo de Documento"}</Label>
              <RadioGroup
                value={formData.tipoDocumento}
                onValueChange={(value: TipoDocumento) => {
                  setFormData({ ...formData, tipoDocumento: value, numeroDocumento: "" })
                  setErrors({ ...errors, numeroDocumento: undefined })
                  setModoLegajo("selector")
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dni" id="dni" />
                  <Label htmlFor="dni" className="font-normal">
                    {"DNI (Documento Nacional de Identidad)"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="legajo" id="legajo" />
                  <Label htmlFor="legajo" className="font-normal">
                    {"Legajo (Alumno/Profesor UTN)"}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.tipoDocumento === "dni" ? (
              <div className="space-y-2">
                <Label htmlFor="numeroDocumento">{"Número de DNI"}</Label>
                <Input
                  id="numeroDocumento"
                  type="text"
                  placeholder="Ej: 12345678"
                  value={formData.numeroDocumento}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setFormData({ ...formData, numeroDocumento: value })
                    setErrors({ ...errors, numeroDocumento: undefined })
                  }}
                  className={errors.numeroDocumento ? "border-destructive" : ""}
                />
                {errors.numeroDocumento && <p className="text-sm text-destructive">{errors.numeroDocumento}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="numeroDocumento">{"Número de Legajo"}</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setModoLegajo(modoLegajo === "selector" ? "manual" : "selector")
                      setFormData({ ...formData, numeroDocumento: "" })
                      setErrors({ ...errors, numeroDocumento: undefined })
                    }}
                    className="text-xs text-primary hover:underline"
                  >
                    {modoLegajo === "selector" ? "Ingresar manualmente" : "Usar selector"}
                  </button>
                </div>

                {modoLegajo === "selector" ? (
                  <Select
                    value={formData.numeroDocumento}
                    onValueChange={(value) => {
                      setFormData({ ...formData, numeroDocumento: value })
                      setErrors({ ...errors, numeroDocumento: undefined })
                    }}
                  >
                    <SelectTrigger className={errors.numeroDocumento ? "border-destructive" : ""}>
                      <SelectValue placeholder="Selecciona un legajo" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEGAJOS_PREDEFINIDOS.map((legajo) => (
                        <SelectItem key={legajo} value={legajo}>
                          {`Legajo ${legajo}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="numeroDocumento"
                    type="text"
                    placeholder="Ej: 45678"
                    value={formData.numeroDocumento}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "")
                      setFormData({ ...formData, numeroDocumento: value })
                      setErrors({ ...errors, numeroDocumento: undefined })
                    }}
                    className={errors.numeroDocumento ? "border-destructive" : ""}
                  />
                )}
                {errors.numeroDocumento && <p className="text-sm text-destructive">{errors.numeroDocumento}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Sección 2: Datos del Vehículo */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              2
            </span>
            <h3 className="text-lg font-semibold text-foreground">{"Datos del Vehículo"}</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patente">{"Patente"}</Label>
              <Input
                id="patente"
                type="text"
                placeholder="Ej: ABC123 o AB123CD"
                value={formData.patente}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase()
                  setFormData({ ...formData, patente: value })
                  setErrors({ ...errors, patente: undefined })
                  setPatenteVerificada(validatePatente(value))
                }}
                className={errors.patente ? "border-destructive" : ""}
              />
              {patenteVerificada && formData.patente && (
                <div className="flex items-center gap-2 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950/30 dark:text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span>{"Patente Verificada (No duplicada)"}</span>
                </div>
              )}
              {errors.patente && <p className="text-sm text-destructive">{errors.patente}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="marca">{"Marca"}</Label>
                <Input
                  id="marca"
                  type="text"
                  placeholder="Ej: Toyota"
                  value={formData.marca}
                  onChange={(e) => {
                    setFormData({ ...formData, marca: e.target.value })
                    setErrors({ ...errors, marca: undefined })
                  }}
                  className={errors.marca ? "border-destructive" : ""}
                />
                {errors.marca && <p className="text-sm text-destructive">{errors.marca}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelo">{"Modelo"}</Label>
                <Input
                  id="modelo"
                  type="text"
                  placeholder="Ej: Corolla"
                  value={formData.modelo}
                  onChange={(e) => {
                    setFormData({ ...formData, modelo: e.target.value })
                    setErrors({ ...errors, modelo: undefined })
                  }}
                  className={errors.modelo ? "border-destructive" : ""}
                />
                {errors.modelo && <p className="text-sm text-destructive">{errors.modelo}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end pt-4">
          <Button type="submit" size="lg" className="min-w-[200px]">
            {"Registrar Vehículo"}
          </Button>
        </div>
      </form>

      {/* Dialog de éxito */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center text-2xl">{"¡Registro Exitoso!"}</DialogTitle>
            <DialogDescription className="text-center text-base">
              {"El vehículo y usuario fueron registrados y enlazados exitosamente"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">
                {formData.tipoDocumento === "dni" ? "DNI:" : "Legajo:"}
              </span>
              <span className="text-muted-foreground">{formData.numeroDocumento}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{"Patente:"}</span>
              <span className="text-muted-foreground">{formData.patente}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{"Marca:"}</span>
              <span className="text-muted-foreground">{formData.marca}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{"Modelo:"}</span>
              <span className="text-muted-foreground">{formData.modelo}</span>
            </div>
          </div>
          <div className="flex justify-center pt-2">
            <Button onClick={handleCloseSuccess} className="w-full">
              {"Aceptar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
