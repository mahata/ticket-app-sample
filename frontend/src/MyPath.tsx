// frontend/src/MyPath.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '@/config'

const MyPath = () => {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState<{ message: string; data: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!token) return

    fetch(`${API_BASE_URL}/api/my-path-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data')
        return res.json()
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
  }, [token])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div>
      <h1>Hello, {user?.name}!</h1>
      <img src={user?.picture} alt={user?.name} />
      <p>Email: {user?.email}</p>
      
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {data && (
        <div>
          <h2>{data.message}</h2>
          <p>{data.data}</p>
        </div>
      )}
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default MyPath
