'use client'

import Link from 'next/link'
import { useState } from 'react'

import { DropzoneProps, useDropzone } from 'react-dropzone'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  isImageFile,
  signUpSchema,
  FormData,
  generateOTP,
  verifyOTP,
} from './utils'

import '../styles.css'

const SignUp = () => {
  const [otp, setOTP] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [picture, setPicture] = useState<File | undefined>(undefined)
  const [pictureError, setPictureError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onDrop = (acceptedFiles: File[]) => {
    // Handle the dropped file (in this case, only the first file)
    const selectedFile = acceptedFiles[0]

    // Validate the selected file
    const isFileValid = isImageFile(selectedFile)

    if (!isFileValid) {
      // Handle invalid file (display error, etc.)
      console.error('Invalid file type')
      setPictureError('Image type should jpg, jpeg or png')
      return
    }

    setPictureError('')
    // Set form data manually
    const formData: FormData = {
      picture: selectedFile ? selectedFile.name : undefined,
    }

    setPicture(selectedFile)

    // Handle form submission or update state with formData
    console.log(selectedFile)
  }

  const dropzoneProps: DropzoneProps = {
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    }, // Accept only image files
    maxFiles: 1, // Limit to a single file
  }
  const { getRootProps, getInputProps } = useDropzone(dropzoneProps)

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!picture) {
      setPictureError('Please select an image')
      return
    }

    setPictureError('')

    data = {
      ...data,
      picture,
    }

    console.log(data)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center my-10">
      <h2 className="text-2xl font-bold mb-6 text-left w-full max-w-md text-gray-800">
        Create Your Account
      </h2>
      <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        {/* Shop Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="shopName"
          >
            Shop Name
          </label>
          <input
            type="text"
            id="shopName"
            {...register('shopName')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.shopName
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.shopName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.shopName.message as string}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.address
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message as string}
            </p>
          )}
        </div>

        {/* Ward/Union Number/Thana/City */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ward"
          >
            Ward/Union Number/Thana/City
          </label>
          <input
            type="text"
            id="ward"
            {...register('ward')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.ward
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.ward && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ward.message as string}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mobileNumber"
          >
            Mobile Number
          </label>
          <input
            type="number"
            id="mobileNumber"
            {...register('mobileNumber')}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.mobileNumber
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.mobileNumber.message as string}
            </p>
          )}
        </div>

        {/* Generate OTP Button */}
        <div className="mb-4">
          <button
            type="button"
            disabled={phoneNumber.length !== 11}
            onClick={() => generateOTP(phoneNumber)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:opacity-80"
          >
            Generate OTP
          </button>
        </div>

        {/* OTP */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="otp"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            {...register('otp')}
            onChange={(e) => setOTP(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.otp
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.otp && (
            <p className="text-red-500 text-xs mt-1">
              {errors.otp.message as string}
            </p>
          )}
        </div>

        {/* Verify OTP Button */}
        <div className="mb-4">
          <button
            type="button"
            disabled={!otp}
            onClick={() => verifyOTP(otp)}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:opacity-80"
          >
            Verify OTP
          </button>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.email
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message as string}
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

        {/* Retype Password */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="retypePassword"
          >
            Retype Password
          </label>
          <input
            type="password"
            id="retypePassword"
            {...register('retypePassword')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.retypePassword
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.retypePassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.retypePassword.message as string}
            </p>
          )}
        </div>

        {/* Picture */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="picture"
          >
            Picture
          </label>
          <div
            {...getRootProps()}
            className="w-full px-3 py-2 border rounded-md outline-none cursor-pointer"
          >
            <input {...getInputProps()} />
            {picture ? (
              <p>&quot;{picture.name}&quot; selected</p>
            ) : (
              <p>
                Drag &apos;n&apos; drop an image here, or click to select one
              </p>
            )}
          </div>
          {pictureError && (
            <p className="text-red-500 text-xs mt-1">
              {pictureError as string}
            </p>
          )}
        </div>

        {/* Trade License */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tradeLicense"
          >
            Trade License
          </label>
          <input
            type="text"
            id="tradeLicense"
            {...register('tradeLicense')}
            className={`w-full px-3 py-2 border rounded-md outline-none ${
              errors.tradeLicense
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.tradeLicense && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tradeLicense.message as string}
            </p>
          )}
        </div>

        {/* Captcha Image */}
        <div className="mb-4">Captcha Image</div>

        {/* Captcha */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="captcha"
          >
            Captcha
          </label>
          <input
            type="text"
            id="captcha"
            {...register('captcha')}
            className={`w-full px-3 py-2 border rounded-md  outline-none ${
              errors.captcha
                ? 'border-red-500'
                : 'focus:border-blue-400 focus:border-2 hover:border-blue-400 border-blue-200'
            }`}
          />
          {errors.captcha && (
            <p className="text-red-500 text-xs mt-1">
              {errors.captcha.message as string}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </form>

      <div className="text-center text-gray-700 mt-5">
        <p className="mb-2">Already have an account?</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in here
        </Link>
      </div>
    </div>
  )
}
export default SignUp
