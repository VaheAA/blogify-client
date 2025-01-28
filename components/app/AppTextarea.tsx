import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FieldError, UseFormRegister } from 'react-hook-form'
import React from 'react'

interface AppTextareaProps {
  id: string
  label: string
  rows?: number
  placeholder?: string
  error?: string | FieldError
  register?: ReturnType<UseFormRegister<Record<string, never>>>
}

export function AppTextarea({
  id,
  label,
  rows = 10,
  placeholder = '',
  error,
  register
}: AppTextareaProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        rows={rows}
        className="transition duration-300"
        id={id}
        placeholder={placeholder}
        {...register(id)}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  )
}
