'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { AppInput } from '@/components/app/AppInput'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInSchema, type TCreateUser, TLoginUser } from '@/lib/validation'

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TLoginUser>({
    resolver: zodResolver(SignInSchema),
    mode: 'onChange'
  })

  const handleSignIn: SubmitHandler<TCreateUser> = async (values) => {
    console.log(values)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
        <div>
          <AppInput id="email" label="Email" register={register} error={errors.email?.message} />
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
          Sign In
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don&rsquo;t have an account?{' '}
        <Link href="/sign-up" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
