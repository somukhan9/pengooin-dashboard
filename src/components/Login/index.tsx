'use client'

import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { loginSchema, FormData } from './utils'

import '../styles.css'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
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
            {...register('username')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.username
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
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
          <input
            type="password"
            id="password"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.password
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
