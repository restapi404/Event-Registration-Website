import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'
import { supabase } from '../supabaseClient'
import { useAuth } from '../hooks/useAuth'
import { validateRegistration } from '../utils/validators'

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [registration, setRegistration] = useState(null)
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (!error && !data) {
        navigate('/register', { replace: true })
        return
      }
      setRegistration(data)
      setForm(data)
      setLoading(false)
    }
    load()
  }, [user.id, navigate])

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSave(e) {
    e.preventDefault()
    const validation = validateRegistration(form)
    setErrors(validation)
    if (Object.keys(validation).length) return

    setSaving(true)
    setServerError('')

    const { name, email, phone, college, year, department } = form
    const { data, error } = await supabase
      .from('registrations')
      .update({ name, email, phone, college, year, department })
      .eq('id', registration.id)
      .select()
      .single()

    setSaving(false)

    if (error) {
      setServerError(error.message)
      return
    }
    setRegistration(data)
    setForm(data)
    setEditing(false)
  }

  async function handleDelete() {
    if (!window.confirm('Delete your registration? This cannot be undone.')) return

    setDeleting(true)
    const { error } = await supabase.from('registrations').delete().eq('id', registration.id)
    setDeleting(false)

    if (error) {
      setServerError(error.message)
      return
    }
    navigate('/register', { replace: true })
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <Spinner label="Loading your registration" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-xl animate-fade-up px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-teal-900">Your registration</h1>
            <p className="mt-1 text-sm text-ink/60">EVENT 2026 · Confirmed</p>
          </div>
          <span className="animate-pulse-glow rounded-full bg-mint-400/20 px-3 py-1 text-xs font-semibold text-teal-700">
            Registered
          </span>
        </div>

        {serverError && <p className="mt-4 text-sm text-red-600">{serverError}</p>}

        {!editing ? (
          <div className="card-hover mt-8 divide-y divide-teal-900/10 rounded-2xl border border-teal-900/10 bg-white">
            {[
              ['Full name', registration.name],
              ['Email', registration.email],
              ['Phone', registration.phone],
              ['College', registration.college],
              ['Year', registration.year],
              ['Department', registration.department],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between px-5 py-3 text-sm">
                <span className="text-ink/50">{label}</span>
                <span className="font-medium text-ink">{value}</span>
              </div>
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} noValidate className="mt-8 space-y-5">
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
                <input id="phone" type="tel" className="input" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
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
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
              </div>
              <div>
                <label className="label" htmlFor="department">Department</label>
                <input id="department" className="input" value={form.department} onChange={(e) => update('department', e.target.value)} />
                {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={() => { setForm(registration); setEditing(false); setErrors({}) }}
                className="rounded-full border border-teal-900/20 px-6 py-3 text-sm font-semibold text-teal-700"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!editing && (
          <div className="mt-6 flex gap-3">
            <button onClick={() => setEditing(true)} className="btn-primary">
              Edit registration
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              {deleting ? 'Deleting…' : 'Delete registration'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
