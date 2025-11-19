import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import MyPath from '@/MyPath'
import { AuthProvider } from '@/contexts/AuthProvider'

const mockUser = {
  name: 'Test User',
  email: 'test@example.com',
  picture: 'https://example.com/avatar.png',
}

describe('MyPath', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'test-token')
    localStorage.setItem('user', JSON.stringify(mockUser))

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Hello', data: 'World' }),
    } as Response)
  })

  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('renders user greeting with name', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <MyPath />
        </AuthProvider>
      </BrowserRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(`Hello, ${mockUser.name}!`)).toBeInTheDocument()
    })
  })
})
