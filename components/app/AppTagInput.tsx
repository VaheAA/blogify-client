import React, { useState, KeyboardEvent, ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { FieldError } from 'react-hook-form'

interface AppTagInputProps {
  id: string
  label: string
  value: string[]
  error?: string | FieldError
  limit?: number
  onChange: (tags: string[]) => void
  onBlur?: () => void
}

export function AppTagInput({
  id,
  label,
  value,
  error,
  limit = 3,
  onChange,
  onBlur
}: AppTagInputProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTag = (): void => {
    if (value.length === limit) return

    const trimmedValue = inputValue.trim()
    if (trimmedValue && !value.includes(trimmedValue)) {
      onChange([...value, trimmedValue]) // Use onChange to update tags
      setInputValue('')
    }
  }

  const handleRemoveTag = (tagToRemove: string): void => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex gap-2 items-center">
          <Input
            id={id}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
            placeholder={`Add up to ${limit} tags...`}
            className="transition duration-300"
          />
          <Button
            onClick={handleAddTag}
            type="button"
            className="bg-white text-indigo-600 hover:bg-gray-100">
            Add
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-500 mt-1">
            {typeof error === 'string' ? error : error.message}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <Badge key={tag} variant="outline" className="rounded-sm px-2 py-1">
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4"
              onClick={() => handleRemoveTag(tag)}>
              <X />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
