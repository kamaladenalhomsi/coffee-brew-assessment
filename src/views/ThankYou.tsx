import styled from 'styled-components'
import { VariantCard, Container } from 'components'
import { Colors, Margin } from 'constants/cssValues'
import { useChoices } from 'contexts/ChoicesContext'

const Head = styled.h1`
  color: ${Colors.DarkGreen};
  font-weight: 800;
`

const CenteredContainer = styled(Container)`
  text-align: center;
  margin-top: ${Margin.ThirtySix};
`

export function ThankYou() {
  const { setChoices } = useChoices()
  const reset = () => {
    setChoices({
      style: {},
      size: {},
      extras: [],
    })
  }

  return (
    <>
      <CenteredContainer>
        <Head>Enjoy your Coffee!</Head>
        <VariantCard.Card
          to="/"
          title="Get another Cup!"
          onClick={reset}
        ></VariantCard.Card>
      </CenteredContainer>
    </>
  )
}
