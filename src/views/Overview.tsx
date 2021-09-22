import { Container, PageHeader, VariantCard, RadioGroup } from 'components'
import {
  useChoices,
  ChoiceWithSubChoices,
  Choices,
} from 'contexts/ChoicesContext'
import { useEffect, useMemo } from 'react'

export function Overview() {
  const { choices } = useChoices()
  const choicesAsArray = useMemo(() => {
    const result: Array<ChoiceWithSubChoices> = []
    Object.keys(choices).forEach((key) => {
      const choice = choices[key as keyof Choices]
      if (Array.isArray(choice)) {
        choice.forEach((sub) => {
          if (sub) {
            result.push({
              ...sub,
              editLink: `/select-${key}`,
            })
          }
        })
      } else {
        if (Object.keys(choice).length > 0) {
          result.push({
            ...choice,
            editLink: `/select-${key}`,
          })
        }
      }
    })
    return result
  }, [JSON.stringify(choices)])

  console.log(choicesAsArray, 'choicesAsArray')
  const cards = choicesAsArray.map(({ title, icon, value, subChoices }) => {
    const hasSubChoices = Boolean(subChoices)
    console.log(hasSubChoices, 'hasSubChoices')
    return (
      <VariantCard.Card
        title={title}
        icon={<VariantCard.Icon noBg={hasSubChoices} name={icon} />}
        key={value}
        isAccordion={hasSubChoices}
        expanded
        presentational
      >
        {subChoices && (
          <RadioGroup.Group>
            {subChoices.map((sub) => (
              <RadioGroup.Element presentational value={sub} key={sub.value}>
                {sub.title}
              </RadioGroup.Element>
            ))}
          </RadioGroup.Group>
        )}
      </VariantCard.Card>
    )
  })

  return (
    <>
      <PageHeader title="Overview" />
      <VariantCard.Container grouped>{cards}</VariantCard.Container>
      <Container>
        <VariantCard.Card
          title="Brew your coffee"
          to="/thank-you"
        ></VariantCard.Card>
      </Container>
    </>
  )
}
