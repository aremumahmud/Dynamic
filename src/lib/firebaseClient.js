'use client'

import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Client-only. Used exclusively for Firebase Authentication on the admin
// login screen. Blog data itself is never read/written from the client SDK -
// it all flows through server API routes backed by firebase-admin.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

function getClientApp() {
  if (getApps().length) {
    return getApps()[0]
  }
  return initializeApp(firebaseConfig)
}

export function getClientAuth() {
  return getAuth(getClientApp())
}
