'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/components/Navigation/Navigation'
import Loading from '@/components/Navigation/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Navigation user={user} />

            <main className="flex flex-col flex-1 py-4">
              {children}
            </main>
        </div>
    )
}

export default AppLayout
