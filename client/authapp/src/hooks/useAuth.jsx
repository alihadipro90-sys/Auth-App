import { useEffect, useState } from 'react'
import { api } from '../helpers/apiClient'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.session().then(({ user: sessionUser }) => setUser(sessionUser)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  async function login(credentials) {
    setLoading(true)
    try { await api.login(credentials); const { user: sessionUser } = await api.session(); setUser(sessionUser) } finally { setLoading(false) }
  }

  async function register(details) {
    setLoading(true)
    try { await api.register(details); const { user: sessionUser } = await api.session(); setUser(sessionUser) } finally { setLoading(false) }
  }

  async function logout() {
    try { await api.logout() } finally { setUser(null) }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}
