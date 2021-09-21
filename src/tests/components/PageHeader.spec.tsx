import { render, screen } from '@testing-library/react'
import { PageHeader } from 'components'

it("it should render breadcrumb title if it's passed", () => {
  const breadCrumbTitle = 'I am breadcrumb title'
  const title = 'I am title'
  render(<PageHeader breadCrumbTitle={breadCrumbTitle} title={title} />)
  const breadCrumbTitleInScreen = screen.getByText(breadCrumbTitle)
  const titleInScreen = screen.getByText(title)
  expect(breadCrumbTitleInScreen).toBeInTheDocument()
  expect(titleInScreen).toBeInTheDocument()
})
