import { z } from 'zod'

export const isValidBangladeshiPhoneNumber = (phoneNumber: string): boolean => {
  // Remove any non-numeric characters and the country code "+88"
  const numericPhoneNumber = phoneNumber.replace(/\D/g, '').replace(/^88/, '')

  // Check if the number has 9 digits
  const isValidFormat = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(
    numericPhoneNumber
  )

  return isValidFormat
}

export const isValidEmail = (value: string = '') => {
  // If the value is not provided, it's considered valid
  if (!value) {
    return true
  }

  // Use a simple regex to check if the value is a valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export const isImageFile = (file: any) => {
  if (!file) {
    return true // If no file is selected, it's considered valid
  }

  const acceptedImageTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    // 'image/gif',
  ]
  return acceptedImageTypes.includes(file.type)
}

export const signUpSchema: any = z
  .object({
    shopName: z
      .string()
      .refine((value) => !!value, { message: 'Shop Name is required' }),
    address: z
      .string()
      .refine((value) => !!value, { message: 'Address is required' }),
    ward: z
      .string()
      .refine((value) => !!value, { message: 'Ward/Union Number is required' }),
    mobileNumber: z
      .string()
      .min(11, 'Mobile number is required')
      .max(11, 'Mobile number should be at least 11 characters')
      .refine((value) => !!value, { message: 'Mobile Number is required' })
      .refine(
        (value) => isValidBangladeshiPhoneNumber(value),
        'Invalid bangladeshi mobile number'
      ),
    otp: z.string().refine((value) => !!value, { message: 'OTP is required' }),
    email: z
      .string()
      .optional()
      .refine((email) => isValidEmail(email), 'Invalid email address'),
    password: z
      .string()
      .min(8, 'Password should be at least 8 characters')
      .refine((value) => !!value, { message: 'Password is required' }),
    retypePassword: z.string().refine((data) => !!data, {
      message: 'Please confirm password',
    }),
    tradeLicense: z
      .string()
      .refine((value) => !!value, { message: 'Trade License is required' }),
    captcha: z
      .string()
      .refine((value) => !!value, { message: 'Captcha is required' }),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: 'Passwords did not match',
    path: ['retypePassword'],
  })

export type FormData = z.infer<typeof signUpSchema>

export const generateOTP = (phoneNumber: string): boolean => {
  if (isValidBangladeshiPhoneNumber(phoneNumber)) {
    console.log(phoneNumber)
    return true
  }

  console.log('phone number invalid')
  return false
}

export const verifyOTP = (otp: string): boolean => {
  console.log('verified or not' + otp)
  return true
}
