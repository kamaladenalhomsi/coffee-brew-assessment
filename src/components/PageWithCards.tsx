import { FC } from 'react'
import { PageHeader, VariantCard } from 'components'
import { useChoices, Choice, Choices } from 'contexts/ChoicesContext'

interface PageWithCardsType {
  data: Choice[]
  title: string
  addTo: keyof Choices
  to: string
}

export const PageWithCards: FC<PageWithCardsType> = ({
  data,
  title,
  addTo,
  to,
}) => {
  const { addChoice } = useChoices()

  const cardsMapped = data.map((card: Choice, index) => (
    <VariantCard.Card
      to={to}
      key={index}
      delay={index * 300}
      title={card.title}
      icon={
        card.icon ? (
          <VariantCard.Icon delay={(index + 2) * 300} name={card.icon} />
        ) : (
          ''
        )
      }
      onClick={() => addChoice({ [addTo]: card })}
    />
  ))

  return (
    <>
      <PageHeader title={title} />
      <VariantCard.Container>{cardsMapped}</VariantCard.Container>
    </>
  )
}
