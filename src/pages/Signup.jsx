import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { validateAuth } from '../utils/validators'
import AuthLayout from '../components/AuthLayout'

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validateAuth(form)
    setErrors(validation)
    if (Object.keys(validation).length) return

    setLoading(true)
    setServerError('')
    const { data, error } = await supabase.auth.signUp(form)
    setLoading(false)

    if (error) {
      setServerError(error.message)
      return
    }

    // If email confirmation is off in the Supabase project, a session is returned immediately.
    if (data.session) navigate('/register')
    else setDone(true)
  }

  if (done) {
    return (
      <AuthLayout eyebrow="Almost there" title="Check your inbox">
        <p className="text-sm text-ink/70">
          We've sent a confirmation link to <strong>{form.email}</strong>. Confirm your email, then log in to
          complete your registration.
        </p>
        <Link to="/login" className="btn-primary mt-6 inline-flex">
          Go to log in
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout eyebrow="Get started" title="Create your account" subtitle="One account, one registration.">
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
          {errors.password ? (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          ) : (
            <p className="mt-1 text-xs text-ink/40">At least 6 characters</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink/60">
        Already registered?{' '}
        <Link to="/login" className="font-medium text-teal-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
