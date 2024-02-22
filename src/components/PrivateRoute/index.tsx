import React from 'react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '@/services/auth.service'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const isAuthenticated = isLoggedIn()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)

    if (!loading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  return <>{isAuthenticated && !loading ? children : null}</>
}

export default PrivateRoute
