'use client'
import Contents from '@/components/ui/Contents'
import SideBar from '@/components/ui/Sidebar'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { isLoggedIn } from '@/services/auth.service'
import Loading from '../loading'
import PrivateRoute from '@/components/PrivateRoute'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    // if (!userLoggedIn) {
    //   router.push("/login");
    // }
    setIsLoading(true)
  }, [router, isLoading])

  if (!isLoading) {
    return <Loading />
  }

  return (
    <PrivateRoute>
      <Layout hasSider>
        <SideBar />
        <Contents>{children}</Contents>
      </Layout>
    </PrivateRoute>
  )
}

export default DashboardLayout
