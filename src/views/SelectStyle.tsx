import { PageWithCards } from 'components'
import stylesData from 'data/styles'

export function SelectStyle({}) {
  return (
    <PageWithCards
      addTo="style"
      data={stylesData}
      title="Select your style"
      to="/select-size"
    />
  )
}
