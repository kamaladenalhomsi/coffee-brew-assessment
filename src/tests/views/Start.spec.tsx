import { render, screen } from '@testing-library/react'
import { Start } from 'views'

beforeEach(() => {
  render(<Start />)
})

it('should have a PageHeader', () => {
  global.checkIfExistByTestId('page-header-container')
})

it('should render StartBackground', () => {
  global.checkIfExistByTestId('start-background')
})
