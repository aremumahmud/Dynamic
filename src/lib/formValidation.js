export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').trim())
}

export function isValidPhone(value) {
  const digits = (value || '').replace(/\D/g, '')
  return digits.length >= 10
}

export function isBlank(value) {
  return !value || !String(value).trim()
}

// Scrolls to and focuses the first field named in `errors`, based on DOM order.
export function focusFirstError(errors) {
  const firstField = Object.keys(errors)[0]
  if (!firstField) return
  const el = document.querySelector(`[name="${firstField}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.focus({ preventScroll: true })
  }
}
