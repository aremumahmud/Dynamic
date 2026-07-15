'use client'

import { getClientAuth } from './firebaseClient'

export async function adminFetch(path, options = {}) {
  const auth = getClientAuth()
  const user = auth.currentUser

  if (!user) {
    throw new Error('Not signed in')
  }

  const token = await user.getIdToken()

  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed: ${response.status}`)
  }

  return response.json()
}
