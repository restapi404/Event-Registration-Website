export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^[6-9]\d{9}$/ // 10-digit Indian mobile numbers

export function validateRegistration(form) {
  const errors = {}

  if (!form.name.trim()) errors.name = 'Name is required'
  else if (form.name.trim().length < 3) errors.name = 'Name must be at least 3 characters'

  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address'

  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  else if (!PHONE_RE.test(form.phone)) errors.phone = 'Enter a valid 10-digit mobile number'

  if (!form.college.trim()) errors.college = 'College name is required'

  if (!form.year) errors.year = 'Select your year of study'

  if (!form.department.trim()) errors.department = 'Department is required'

  return errors
}

export function validateAuth({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'

  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'

  return errors
}
