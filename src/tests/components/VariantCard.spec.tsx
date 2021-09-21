import { render, screen } from '@testing-library/react'
import { VariantCard } from 'components'

it('renders title', () => {
  const title = 'I am VariantCard.Card title'
  render(<VariantCard.Card title={title} />)
  const titleInScreen = screen.getByText(title)
  expect(titleInScreen).toBeInTheDocument()
})

it('renders icon if passed', () => {
  const icon = <VariantCard.Icon name="cup-lungo" />
  render(<VariantCard.Card title="title" icon={icon} />)
  global.checkIfExistByTestId('variant-card-icon')
})
