import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import { supabase } from '../supabaseClient'
import { useAuth } from '../hooks/useAuth'
import { validateRegistration } from '../utils/validators'

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

const EMPTY_FORM = { name: '', email: '', phone: '', college: '', year: '', department: '' }

export default function Register() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [checkingExisting, setCheckingExisting] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // If this user already has a registration, send them to the dashboard instead
  // of letting them create a duplicate.
  useEffect(() => {
    let ignore = false

    async function checkExisting() {
      const { data } = await supabase
        .from('registrations')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!ignore && data) navigate('/dashboard', { replace: true })
      if (!ignore) setCheckingExisting(false)
    }

    checkExisting()
    return () => { ignore = true }
  }, [user.id, navigate])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validateRegistration(form)
    setErrors(validation)
    if (Object.keys(validation).length) return

    setSubmitting(true)
    setServerError('')

    const { error } = await supabase.from('registrations').insert({ ...form, user_id: user.id })

    setSubmitting(false)

    if (error) {
      setServerError(error.code === '23505' ? 'You have already registered for this event.' : error.message)
      return
    }
    navigate('/dashboard')
  }

  if (checkingExisting) {
    return (
      <div>
        <Navbar />
        <Spinner label="Checking your registration" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-xl animate-fade-up px-6 py-12">
        <h1 className="text-2xl font-bold text-teal-900">Event registration</h1>
        <p className="mt-1 text-sm text-ink/60">Fill this out once — you can edit it later from your dashboard.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <input id="name" className="input" value={form.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="email">Email address</label>
              <input id="email" type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
            <div>
              <label className="label" htmlFor="phone">Phone number</label>
              <input id="phone" type="tel" className="input" placeholder="10-digit mobile number" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="label" htmlFor="college">College name</label>
            <input id="college" className="input" value={form.college} onChange={(e) => update('college', e.target.value)} />
            {errors.college && <p className="mt-1 text-xs text-red-600">{errors.college}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="year">Year of study</label>
              <select id="year" className="input" value={form.year} onChange={(e) => update('year', e.target.value)}>
                <option value="">Select year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
              {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
            </div>
            <div>
              <label className="label" htmlFor="department">Department</label>
              <input id="department" className="input" placeholder="e.g. Computer Science" value={form.department} onChange={(e) => update('department', e.target.value)} />
              {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
            </div>
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Submitting…' : 'Submit registration'}
          </button>
        </form>
      </div>
    </div>
  )
}
