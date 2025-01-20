'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AppInput } from '@/components/app/AppInput'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema, type TCreateUser } from '@/lib/validation'

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TCreateUser>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange'
  })

  const handleSignUp: SubmitHandler<TCreateUser> = async (values) => {
    console.log(values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div>
          <AppInput id="email" label="Email" register={register} error={errors.email?.message} />
        </div>

        <div>
          <AppInput
            id="username"
            label="Username"
            register={register}
            error={errors.username?.message}
          />
        </div>

        <div>
          <AppInput
            id="password"
            label="Password"
            register={register}
            error={errors.password?.message}
          />
        </div>

        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
