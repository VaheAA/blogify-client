import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldError, UseFormRegister } from 'react-hook-form'

interface AppInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  error?: string | FieldError
  register?: ReturnType<UseFormRegister<Record<string, never>>>
}

export function AppInput({
  id,
  label,
  type = 'text',
  placeholder = '',
  error,
  register
}: AppInputProps) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        className="transition duration-300"
        id={id}
        type={type}
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
