import { getAdminAuth } from './firebaseAdmin.js'

function getAllowlistedEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

// Verifies the Firebase ID token sent from the admin UI and checks the
// signed-in email against the ADMIN_EMAILS allowlist. Throws on failure.
export async function requireAdmin(request) {
  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    throw new Error('Missing Authorization header')
  }

  const decoded = await getAdminAuth().verifyIdToken(token)
  const email = (decoded.email || '').toLowerCase()
  const allowlist = getAllowlistedEmails()

  // Note: we deliberately don't require decoded.email_verified here — admin
  // users are created directly in Firebase Console (Authentication > Users)
  // with no email-verification flow, so that flag is never set to true.
  // The ADMIN_EMAILS allowlist is the actual access boundary.
  if (!allowlist.includes(email)) {
    throw new Error('Not authorized')
  }

  return decoded
}
