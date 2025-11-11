import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MyPath from '@/MyPath'

describe('MyPath', () => {
  it('renders "Hello, world!"', () => {
    render(<MyPath />)
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
  })
})
