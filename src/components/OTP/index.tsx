import { useEffect, useRef, useState } from 'react'

const OTP = ({
  isSignIn,
  setIsSignIn,
  closeOTP,
  otpLength = 0,
  handleOTPSubmit = () => {},
}: any) => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''))
  const otpInputRefs = useRef([])

  useEffect(() => {
    if (otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus()
    }
  }, [])

  const handleOnChange = (index, e) => {
    const value = e.target.value
    if (isNaN(value)) return

    const newOtp = [...otp]
    // allow only one input
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // submit trigger
    const combinedOtp = newOtp.join('')
    if (combinedOtp.length === otpLength) {
      handleOTPSubmit(combinedOtp)
    }

    // Move to next input if current field is filled
    if (value && index < otpLength - 1 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus()
    }
  }

  const handleOnClick = (index) => {
    otpInputRefs.current[index].setSelectionRange(1, 1)

    // optional
    if (index > 0 && !otp[index - 1]) {
      otpInputRefs.current[otp.indexOf('')].focus()
    }
  }

  const handleOnKeyDown = (index, e) => {
    if (
      e.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      otpInputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      otpInputRefs.current[index - 1].focus()
    }
  }

  return (
    <div className="min-w-[15rem]">
      <h4 className="mb-4 text-center text-xl font-semibold">Enter OTP Here</h4>
      <div className="flex items-center justify-center gap-4">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => (otpInputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => handleOnChange(index, e)}
            onClick={() => handleOnClick(index)}
            onKeyDown={(e) => handleOnKeyDown(index, e)}
            className="h-10 w-10 rounded-md border border-indigo-500 text-center outline-none ring-offset-indigo-600 focus:ring-2"
          />
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {isSignIn ? (
          <button
            onClick={() => {
              closeOTP()
            }}
          >
            Try Again
          </button>
        ) : (
          <button
            onClick={() => {
              // closeOTP()
            }}
          >
            Generate OTP Again
          </button>
        )}
      </div>
    </div>
  )
}
export default OTP
