import { createContext } from 'react'

export interface User {
  name: string
  email: string
  picture: string
}

export interface AuthContextType {
  user: User | null
  token: string | null
  login: (credential: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
