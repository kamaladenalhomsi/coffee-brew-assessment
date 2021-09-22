import styled from 'styled-components'
import { useMemo, useRef } from 'react'
import { PageHeader, VariantCard, RadioGroup, PageWithCards } from 'components'
import { useChoices, SubChoice } from 'contexts/ChoicesContext'
import extrasData from 'data/extras'
import { useButton } from '@react-aria/button'
import { Colors, Radius, Padding, Margin } from 'constants/cssValues'
import { useLocation } from 'wouter'

const NextButton = styled.button`
  border: 0;
  color: ${Colors.White};
  border-radius: ${Radius.LG};
  padding: ${Padding.Four};
  background-color: ${Colors.PrimaryGreenDarken};
  font-weight: 600;
  margin: ${Margin.Five} auto;
  display: block;
  width: fit-content;
`

export function SelectExtras({}) {
  const [location, setLocation] = useLocation()
  const { pushSubChoice, choices } = useChoices()

  const pushSubChoiceToChoices = (value: SubChoice) => {
    pushSubChoice('extras', {
      ...extrasData[0],
      subChoices: [value],
    })
  }

  const sugarIsSelected = useMemo(() => {
    return (
      choices.extras.findIndex(
        (choice) => choice.value === extrasData[1].value
      ) > -1
    )
  }, [choices])

  const extrasHasAtLeastOneOption = useMemo(() => {
    return choices.extras.length > 0
  }, [choices])

  const nextButtonRef = useRef(null)

  const { buttonProps } = useButton(
    {
      onPress: () => setLocation('/overview'),
    },
    nextButtonRef
  )

  return (
    <>
      <PageHeader title="Select your extras" />
      <VariantCard.Container>
        <VariantCard.Card
          title={extrasData[0].title}
          icon={<VariantCard.Icon noBg name={extrasData[0].icon} />}
          isAccordion
        >
          <RadioGroup.Group onChange={pushSubChoiceToChoices}>
            {extrasData[0].subChoices?.map((choice) => (
              <RadioGroup.Element value={choice} key={choice.value}>
                {choice.title}
              </RadioGroup.Element>
            ))}
          </RadioGroup.Group>
        </VariantCard.Card>
        <VariantCard.Card
          title={extrasData[1].title}
          icon={<VariantCard.Icon name={extrasData[1].icon} />}
          onClick={() => {
            pushSubChoice('extras', { ...extrasData[1] })
          }}
          selected={sugarIsSelected}
        />
      </VariantCard.Container>
      {extrasHasAtLeastOneOption && (
        <NextButton {...buttonProps} ref={nextButtonRef}>
          Go to overview
        </NextButton>
      )}
    </>
  )
}
