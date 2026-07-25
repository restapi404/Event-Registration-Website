import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { validateAuth } from '../utils/validators'
import AuthLayout from '../components/AuthLayout'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validateAuth(form)
    setErrors(validation)
    if (Object.keys(validation).length) return

    setLoading(true)
    setServerError('')
    const { error } = await supabase.auth.signInWithPassword(form)
    setLoading(false)

    if (error) {
      setServerError(error.message)
      return
    }
    navigate(location.state?.from || '/dashboard')
  }

  return (
    <AuthLayout eyebrow="Welcome back" title="Log in to ZENITH" subtitle="Access your registration anytime.">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        New here?{' '}
        <Link to="/signup" className="font-medium text-teal-600 hover:underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  )
}
