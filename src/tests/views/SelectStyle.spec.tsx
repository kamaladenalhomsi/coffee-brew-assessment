import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectStyle } from 'views/index'
import stylesData from 'data/styles'
import { ChoicesContext, useChoices } from 'contexts/ChoicesContext'
import { ReactNode } from 'react'

const contextRenderer = (
  ui: ReactNode,
  providerProps: any,
  renderOptions?: any
) => {
  return render(
    <ChoicesContext.Provider value={providerProps}>
      {ui}
    </ChoicesContext.Provider>,
    renderOptions
  )
}

it('should have a PageHeader', () => {
  render(<SelectStyle />)
  global.checkIfExistByTestId('page-header-container')
})

it('should render all style cards', () => {
  render(<SelectStyle />)
  const cards = screen.getAllByTestId('variant-card')
  expect(cards.length).toEqual(stylesData.length)
})

it('should add item to ChoicesContext on click', () => {
  const props = {
    choices: [],
    setChoices: jest.fn(),
  }
  contextRenderer(<SelectStyle />, props)
  const card = screen.getAllByTestId('variant-card')[0]
  userEvent.click(card)
  expect(props.setChoices).toHaveBeenCalled()
})
