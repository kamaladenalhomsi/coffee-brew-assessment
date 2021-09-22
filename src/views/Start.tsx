import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { Link } from 'wouter'
import { PageHeader } from 'components'
import { Margin } from 'constants/cssValues'

const StartBackground = styled(Link)`
  display: block;
  height: 100vw;
  position: relative;
  margin-top: ${Margin.Twenty};
`

const AnimatedGraphic = styled(animated.img)`
  position: absolute;
  transition: 0.3s ease-out;
`

const MachineGraphic = styled(AnimatedGraphic)`
  height: inherit;
  width: 100%;
`

const CardGraphic = styled(AnimatedGraphic)`
  width: 70vw;
  top: -27px;
  z-index: 9;
`

const FAQLink = styled.h4`
  text-decoration: underline;
  margin-top: ${Margin.Eight};
  margin-left: ${Margin.Four};
  font-weight: 500;
`

export function Start({}) {
  const machineAnimation = useSpring({
    from: { translateX: '-100%' },
    to: { translateX: '-15vw' },
  })

  const cardAnimation = useSpring({
    delay: 300,
    from: { translateX: '150%' },
    to: { translateX: '34vw' },
  })
  return (
    <>
      <PageHeader
        breadCrumbTitle="Dark Roasted Beans"
        title="Tab the machine to start"
      />
      <StartBackground data-testid="start-background" href="/select-style">
        <MachineGraphic
          style={machineAnimation}
          src={require('assets/images/start-machine.svg').default}
        />
        <CardGraphic
          style={cardAnimation}
          src={require('assets/images/start-card.svg').default}
        />
      </StartBackground>
      <FAQLink>How does this work?</FAQLink>
    </>
  )
}
