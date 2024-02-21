import Link from 'next/link'

import '../../../styles.css'

type TProps = {
  params: {
    shopId: string
  }
}

const RegistrationSuccess = ({ params: { shopId } }: TProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-bold">You Have Successfully Signed up.</h1>
      <h4 className="text-lg font-semibold">
        Your Shop ID is &quot;<strong>{shopId}</strong>&quot; ({shopId.length}{' '}
        Digit). Please Use this Shop ID as your Username.
      </h4>
      <p className="text-base">
        Thanks for Choosing us, as your E-commerce service provider.
      </p>
      <Link
        href="/login"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go To Login Page
      </Link>
    </div>
  )
}
export default RegistrationSuccess
