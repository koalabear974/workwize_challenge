import ApplicationLogo from '@/components/ApplicationLogo'
import Link from 'next/link'
import NavLink from '@/components/Navigation/NavLink'
import ResponsiveNavLink, {
  ResponsiveNavButton,
} from '@/components/Navigation/ResponsiveNavLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Dropdown } from 'flowbite-react'
import { HiLogout } from 'react-icons/hi'
import CartDropdown from '@/components/Cart/CartDropdown'

const Navigation = ({ user }) => {
  const { logout } = useAuth()

  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-100">
      {/* Primary Navigation Menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/public">
                <ApplicationLogo className="block w-4 w-auto fill-current text-gray-600" />
              </Link>
            </div>

            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              {['admin', 'supplier'].includes(user?.role) && (
                <NavLink
                  href="/products"
                  active={usePathname() === '/products'}>
                  Products
                </NavLink>
              )}
              <NavLink
                href="/orders"
                active={usePathname() === '/orders'}>
                Orders
              </NavLink>
            </div>
          </div>

          {/* Settings Dropdown */}
          <div className="hidden sm:flex sm:items-center sm:ml-6 gap-2">
            {['user'].includes(user?.role) && (
              <CartDropdown />
            )}
            <Dropdown
              label={user?.name}
              color="gray"
              dismissOnClick={false}
            >
              <Dropdown.Item icon={HiLogout} onClick={logout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>

          {/* Hamburger */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(open => !open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24">
                {open ? (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Menu */}
      {open && (
        <div className="block sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {['admin', 'supplier'].includes(user?.role) && (
              <ResponsiveNavLink
                href="/products"
                active={usePathname() === '/products'}>
                Products
              </ResponsiveNavLink>
            )}
            <ResponsiveNavLink
              href="/orders"
              active={usePathname() === '/orders'}>
              Orders
            </ResponsiveNavLink>
          </div>

          {/* Responsive Settings Options */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 fill-current text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="ml-3">
                <div className="font-medium text-base text-gray-800">
                  {user?.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {/* Authentication */}
              {['user'].includes(user?.role) && (
                <Link href="/cart">
                  <ResponsiveNavButton onClick={() => {}}>
                    Cart
                  </ResponsiveNavButton>
                </Link>
              )}
              <ResponsiveNavButton onClick={logout}>
                Logout
              </ResponsiveNavButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
