import { PageHeader, VariantCard } from 'components'
import { useChoices } from 'contexts/ChoicesContext'
import styleData from 'data/styles'

interface DrinkCard {
  title: string
  value: string
  icon?: string
}

export function SelectStyle({}) {
  const { addChoice } = useChoices()
  const cards: DrinkCard[] = styleData

  const cardsMapped = cards.map(({ title, value, icon }: DrinkCard, index) => (
    <VariantCard.Card
      to="/"
      key={index}
      delay={index * 300}
      title={title}
      icon={
        icon ? <VariantCard.Icon delay={(index + 2) * 300} name={icon} /> : ''
      }
      onClick={() => addChoice({ style: { label: title, value } })}
    />
  ))

  return (
    <>
      <PageHeader breadCrumbTitle="Brew with Lex" title="Select your style" />
      <VariantCard.Container>{cardsMapped}</VariantCard.Container>
    </>
  )
}
