import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
      <div className="text-gray-900 antialiased min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <AuthCard>
            {children}
        </AuthCard>
      </div>
    )
}

export default Layout
