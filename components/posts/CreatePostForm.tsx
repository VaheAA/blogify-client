'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateEditPostSchema, TCreateEditPost } from '@/lib/validation/schemas/createEditPost'
import { AppInput } from '@/components/app/AppInput'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { AppTagInput } from '@/components/app/AppTagInput'
import { useMutation } from '@tanstack/react-query'
import { BASE_API_URL } from '@/lib/constants'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useEditPostStore } from '@/stores'
import { AppTextarea } from '@/components/app/AppTextarea'

export function CreateEditPostForm() {
  const { post, isDialogOpen, closeDialog, openDialog } = useEditPostStore()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<TCreateEditPost>({
    resolver: zodResolver(CreateEditPostSchema),
    mode: 'onSubmit',
    defaultValues: {
      tags: [],
      title: '',
      content: ''
    }
  })

  useEffect(() => {
    reset({
      tags: post?.tags.map((tag) => tag.name) ?? [],
      title: post?.title ?? '',
      content: post?.content ?? ''
    })
  }, [post, isDialogOpen, reset])

  const { getToken } = useAuthStore()
  const token = getToken()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (values: TCreateEditPost) => {
      const response = await fetch(`${BASE_API_URL}/posts/${post?.id ?? ''}`, {
        method: post ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Something went wrong')
      }

      return response.json()
    },
    onSuccess: async () => {
      toast({
        className: 'bg-green-400 text-white',
        title: 'Post created successfully!',
        duration: 4000
      })
      closeDialog()
      await queryClient.invalidateQueries({ queryKey: ['posts'] })
      reset()
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
        duration: 4000
      })
      reset()
    }
  })

  const onSubmit: SubmitHandler<TCreateEditPost> = (values) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} className="bg-indigo-600 text-white hover:bg-indigo-700">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <AppInput id="title" label="Title" register={register} error={errors.title?.message} />
          </div>
          <div className="my-3">
            <AppTextarea
              id="content"
              label="Content"
              register={register}
              error={errors.title?.message}
            />
          </div>
          <div className="my-3">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <AppTagInput
                  id="tags"
                  label="Tags"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.tags?.message}
                  limit={3}
                />
              )}
            />
          </div>

          <Button
            disabled={mutation.isPending}
            type="submit"
            className="bg-indigo-600 text-white hover:bg-indigo-700 w-full mt-4">
            {mutation.isPending && <Loader2 className="animate-spin" />}
            Submit
          </Button>
          <DialogClose className="w-full" asChild>
            <Button onClick={closeDialog} type="button" className="w-full mt-4" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
