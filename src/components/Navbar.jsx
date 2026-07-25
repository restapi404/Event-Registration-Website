import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-teal-900/5 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-bold tracking-tight text-teal-700 transition-transform hover:scale-105">
          ZENITH<span className="text-gold">'26</span>
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="relative text-sm font-medium text-teal-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-teal-500 after:transition-all after:duration-300 hover:text-teal-500 hover:after:w-full"
              >
                My registration
              </Link>
              <button onClick={handleSignOut} className="btn-primary !bg-teal-700 !px-4 !py-2">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="relative hidden text-sm font-medium text-teal-700 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-teal-500 after:transition-all after:duration-300 hover:text-teal-500 hover:after:w-full sm:inline"
              >
                Log in
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2">
                Register now
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
