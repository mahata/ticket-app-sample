import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app with heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeDefined()
  })

  it('renders the button with initial count', () => {
    render(<App />)
    expect(screen.getByRole('button')).toBeDefined()
    expect(screen.getByText(/count is 0/i)).toBeDefined()
  })
})
