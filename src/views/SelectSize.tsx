import { PageWithCards } from 'components'
import sizesData from 'data/sizes'

export function SelectSize() {
  return (
    <PageWithCards
      addTo="size"
      data={sizesData}
      title="Select your size"
      to="/select-extras"
    />
  )
}
