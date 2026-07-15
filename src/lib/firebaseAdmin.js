import { getApps, initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

// Server-only. Uses a service account so all Firestore reads/writes for the
// blog run through our own API routes/server components, never the client SDK.
// Firestore security rules can stay locked down (deny all) as a result.
function getAdminApp() {
  if (getApps().length) {
    return getApps()[0]
  }

  const rawServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY

  if (!rawServiceAccount) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT_KEY is not set. Add a base64-encoded Firebase service account JSON to your environment variables.'
    )
  }

  const decoded = Buffer.from(rawServiceAccount, 'base64').toString('utf8')
  const serviceAccount = JSON.parse(decoded)

  return initializeApp({
    credential: cert(serviceAccount),
  })
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}
