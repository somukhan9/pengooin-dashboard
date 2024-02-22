'use client'

import Link from 'next/link'
import { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, FormData as SubmitValue } from './utils'

import { useRouter } from 'next/navigation'
import { useUserLoginMutation } from '@/redux/api/authApi'
import { storeUserInfo } from '@/services/auth.service'
import { toast } from 'react-toastify'

import 'boxicons/css/boxicons.min.css'

import '../../styles.css'

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = useForm<SubmitValue>({ resolver: zodResolver(loginSchema) })

  const router = useRouter()
  const [userLogin] = useUserLoginMutation()

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)

    const response: any = await userLogin(data)

    // console.log(response)

    if (response?.data?.success) {
      // Reset the form
      reset()

      // Set the access token at local storage
      storeUserInfo({ accessToken: response?.data?.data?.accessToken })

      // Finally redirect the user to profile page
      router.replace('/profile')

      return
    }

    if (
      response?.error?.status >= 400 &&
      response?.error?.status < 500 &&
      response?.error?.message
    ) {
      toast.error('Invalid credentials! Please try with correct one.')
      return
    }

    toast.error('Something went wrong! Please try again.')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl font-bold mb-6 text-left w-full max-w-md text-gray-800">
        Welcome Back! Log in to Your Account
      </h2>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('usernameOrEmail')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.username
                ? 'border-red-500'
                : 'focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-blue-500 border-blue-200'
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message as string}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-md outline-none ${
                errors.password
                  ? 'border-red-500'
                  : 'focus:ring-blue-500 focus:ring-1 focus:border-blue-500 hover:border-blue-500 border-blue-200 absolute top-0 right-0'
              }`}
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute z-50 h-10 text-gray-700 flex items-center justify-center text-2xl right-2"
            >
              {showPassword ? (
                <i className="bx bx-hide z-50"></i>
              ) : (
                <i className="bx bx-show z-50"></i>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <div className="h-14" />
        <button
          disabled={isSubmitting || !isValid}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:opacity-80"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-5 text-gray-700">
        <p className="mb-2">Don&apos;t have an account?</p>
        <Link href="/signup" className="text-green-500 hover:underline">
          Sign up now
        </Link>
      </div>
    </div>
  )
}
export default Login
