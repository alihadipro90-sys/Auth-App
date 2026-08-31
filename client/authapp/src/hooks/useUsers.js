import { useEffect, useState } from 'react'
import { api } from '../helpers/apiClient'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const { users: liveUsers } = await api.listUsers()
      setUsers(liveUsers)
    } catch (requestError) {
      setUsers([])
      setError(requestError.message)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    api.listUsers().then(({ users: liveUsers }) => setUsers(liveUsers)).catch((requestError) => {
      setUsers([])
      setError(requestError.message)
    }).finally(() => setLoading(false))
  }, [])

  async function createUser(user) {
    try {
      const { user: created } = await api.createUser(user)
      setUsers((current) => [created, ...current])
    } catch (requestError) { setError(requestError.message); throw requestError }
  }

  async function updateUser(id, changes) {
    try {
      const { user: updated } = await api.updateUser(id, changes)
      setUsers((current) => current.map((item) => item._id === id ? updated : item))
    } catch (requestError) { setError(requestError.message); throw requestError }
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id)
      setUsers((current) => current.filter((item) => item._id !== id))
    } catch (requestError) { setError(requestError.message); throw requestError }
  }

  return { users, error, loading, reload: loadUsers, createUser, updateUser, deleteUser }
}