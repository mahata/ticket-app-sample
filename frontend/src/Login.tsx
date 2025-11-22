import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          renderButton: (
            element: HTMLElement,
            config: { theme: string; size: string }
          ) => void
        }
      }
    }
  }
}

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      navigate('/my-path')
      return
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      const googleClientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID
      
      if (!googleClientId) {
        setError('Google Client ID not configured')
        return
      }

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response: { credential: string }) => {
          try {
            await login(response.credential)
            navigate('/my-path')
          } catch (err) {
            console.error(err)
            setError('Login failed. Please try again.')
          }
        },
      })

      const buttonDiv = document.getElementById('googleSignInButton')
      if (buttonDiv) {
        window.google.accounts.id.renderButton(buttonDiv, {
          theme: 'outline',
          size: 'large',
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [user, login, navigate])

  return (
    <div>
      <h1>Login Required</h1>
      <p>Please sign in with Google to access this page.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id="googleSignInButton"></div>
    </div>
  )
}

export default Login
