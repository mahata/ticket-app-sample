import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'

describe('App', () => {
  it('renders the app with heading', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByText('Vite + React')).toBeDefined()
  })

  it('renders the button with initial count', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getByText(/count is 0/i)).toBeDefined()
  })
})
