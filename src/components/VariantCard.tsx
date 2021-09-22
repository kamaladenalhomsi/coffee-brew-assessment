import {
  ReactNode,
  useRef,
  FC,
  useState,
  ComponentType,
  HTMLAttributes,
} from 'react'
import styled from 'styled-components'
import { Padding, Radius, Colors, Margin } from 'constants/cssValues'
import { Container as GlobalContainer } from './Container'
import { useSpring, animated } from 'react-spring'
import { useButton } from '@react-aria/button'
import { useLocation } from 'wouter'
import { Checkmark } from 'components'

interface VariantCardProps {
  icon?: ReactNode
  title: string | ReactNode
  delay?: number
  onClick?: () => void
  to?: string | undefined | null
  isAccordion?: boolean
  tag?: ComponentType | keyof JSX.IntrinsicElements
  selected?: boolean | undefined
  expanded?: boolean
  presentational?: boolean
}

interface ContainerProps {
  grouped?: boolean
}

interface IconWrapperType {
  noBg?: boolean
}
interface IconProps extends IconWrapperType {
  name: string | undefined
  delay?: number
}

const VariantCardWrapper = styled(animated.div)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  border-radius: ${Radius.Normal};
  background-color: ${Colors.PrimaryGreen};
  box-shadow: 0px 1px 4px rgba(182, 133, 133, 0.15);
  margin-bottom: ${Margin.Two};
  transition: 0.3s ease-out;
  &:last-child {
    margin-bottom: 0;
  }
`

const VariantCardTitle = styled.h4`
  color: ${Colors.White};
  font-weight: 600;
`
const VariantCardHead = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 94px;
  padding: ${Padding.Six};
`

const IconWrapper = styled.div<IconWrapperType>`
  width: 48px;
  height: ${(p) => (p.noBg ? 'inherit' : '48px')};
  border-radius: ${Radius.FULL};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: ${Margin.Five};
  overflow: hidden;
  background-color: ${(p) => (p.noBg ? 'transparent' : Colors.DarkGreen)};
`

const IconImg = styled(animated.img)`
  height: 30px;
  transition: 0.5s ease-in-out;
`

const AccordionContent = styled(animated.div)`
  width: 100%;
  padding: ${Padding.Four};
  position: relative;
  &:before {
    position: absolute;
    top: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    content: '';
    display: block;
    width: calc(100% - ${Padding.Ten});
    height: 1px;
    background-color: ${Colors.White};
  }
`

const CheckmarkWrapper = styled.div`
  margin-left: ${Margin.Four};
`

export const Card: FC<VariantCardProps> = ({
  icon,
  title,
  children,
  delay = 0,
  onClick,
  to,
  isAccordion = false,
  selected = false,
  expanded = false,
  presentational = false,
}) => {
  let accessibilityProps = {}
  const [location, setLocation] = useLocation()
  const [isAccordionActive, setAccordionActive] = useState<boolean>(expanded)
  const animationStyle = useSpring({
    delay,
    from: { translateX: '-100%', opacity: 0 },
    to: { translateX: '0', opacity: 1 },
  })
  const accordionClick = () => setAccordionActive(!isAccordionActive)
  const ref = useRef(null)
  const navigate = () => {
    if (onClick) onClick()
    if (to) {
      setLocation(to)
    }
  }
  let { buttonProps } = useButton(
    {
      elementType: 'div',
      onPress: isAccordion ? accordionClick : navigate,
    },
    ref
  )
  if (!presentational) {
    accessibilityProps = buttonProps
  }

  return (
    <VariantCardWrapper data-testid="variant-card" style={animationStyle}>
      <VariantCardHead onClick={navigate} {...accessibilityProps} ref={ref}>
        {icon}
        <VariantCardTitle>{title}</VariantCardTitle>
        {selected && (
          <CheckmarkWrapper>
            <Checkmark isSelected={selected} />
          </CheckmarkWrapper>
        )}
      </VariantCardHead>
      {isAccordionActive && isAccordion && (
        <AccordionContent>{children}</AccordionContent>
      )}
    </VariantCardWrapper>
  )
}

export const Icon = ({ name, delay = 0, noBg = false }: IconProps) => {
  const animationStyle = useSpring({
    delay,
    from: { translateY: '100%' },
    to: { translateY: '0' },
  })
  return (
    <IconWrapper noBg={noBg}>
      <IconImg
        data-testid="variant-card-icon"
        alt="Cup Icon"
        style={animationStyle}
        src={require(`assets/images/${name}.svg`).default}
      />
    </IconWrapper>
  )
}

export const Container = styled(GlobalContainer)<ContainerProps>`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.grouped &&
    `
      > ${VariantCardWrapper} {
        margin: 0;
        border-radius: ${Radius.None};
        &:first-child {
          border-radius: ${Radius.Normal} ${Radius.Normal} 0 0;
        }
        &:last-child {
          border-radius: 0 0 ${Radius.Normal} ${Radius.Normal};
        }
        &:after {
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          margin: 0 auto;
          content: '';
          display: block;
          width: calc(100% - ${Padding.Ten});
          height: 1px;
          background-color: ${Colors.White};
        }
      }
    `}
`
