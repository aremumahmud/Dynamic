'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { getClientAuth } from '../../lib/firebaseClient'

export default function AdminGuard({ children }) {
  const router = useRouter()
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    const auth = getClientAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus('ready')
      } else {
        setStatus('redirecting')
        router.replace('/admin/login')
      }
    })
    return unsubscribe
  }, [router])

  if (status !== 'ready') {
    return <div className="admin-loading">Checking authentication...</div>
  }

  return children
}
