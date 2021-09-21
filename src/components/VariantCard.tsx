import { ReactNode, useRef, FC } from 'react'
import styled from 'styled-components'
import { Padding, Radius, Colors, Margin } from 'constants/cssValues'
import { Container as GlobalContainer } from './Container'
import { useSpring, animated } from 'react-spring'
import { useButton } from '@react-aria/button'
import { Link } from 'wouter'

interface VariantCardProps {
  icon?: ReactNode
  title: string | ReactNode
  delay?: number
  onClick?: () => void
  to: string
}

interface ContainerProps {
  grouped?: boolean
}

interface IconProps {
  name: string
  delay?: number
}

const VariantCardWrapper = styled(animated.div)`
  width: 100%;
  position: relative;
  min-height: 94px;
  padding: ${Padding.Six};
  border-radius: ${Radius.Normal};
  background-color: ${Colors.PrimaryGreen};
  box-shadow: 0px 1px 4px rgba(182, 133, 133, 0.15);
  display: flex;
  align-items: center;
  margin-bottom: ${Margin.Two};
  transition: 0.3s ease-in-out;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    box-shadow: 0px 1px 4px 5px rgba(182, 133, 133, 0.15);
    background-color: ${Colors.PrimaryGreenDarken};
  }
`

const VariantCardTitle = styled.h4`
  color: ${Colors.White};
  font-weight: 600;
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${Colors.DarkGreen};
  border-radius: ${Radius.FULL};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-right: ${Margin.Five};
  overflow: hidden;
`

const IconImg = styled(animated.img)`
  height: 30px;
  transition: 0.5s ease-in-out;
`

export const Card: FC<VariantCardProps> = ({
  icon,
  title,
  children,
  delay = 0,
  onClick,
  to,
}) => {
  const animationStyle = useSpring({
    delay,
    from: { translateX: '-20%', opacity: 0 },
    to: { translateX: '0', opacity: 1 },
  })
  const ref = useRef(null)
  let { buttonProps } = useButton({ elementType: 'div', onPress: onClick }, ref)
  return (
    <Link to={to}>
      <VariantCardWrapper
        data-testid="variant-card"
        ref={ref}
        style={animationStyle}
        {...buttonProps}
      >
        {icon}
        <VariantCardTitle>{title}</VariantCardTitle>
      </VariantCardWrapper>
    </Link>
  )
}

export const Icon = ({ name, delay = 0 }: IconProps) => {
  const animationStyle = useSpring({
    delay,
    from: { translateY: '100%' },
    to: { translateY: '0' },
  })
  return (
    <IconWrapper>
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
          &:after {
            display: none;
          }
        }
        &:after {
          content: '';
          width: 90%;
          height: 1px;
          background-color: ${Colors.White};
          display: block;
          position: absolute;
          bottom: 0;
        }
      }
    `}
`
