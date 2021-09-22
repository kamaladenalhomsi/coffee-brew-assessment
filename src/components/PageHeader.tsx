import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { Container } from './Container'

interface PageHeaderProps {
  breadCrumbTitle?: string
  title: string
}

const PageHeaderWrapper = styled(animated.header)`
  transition: 0.5s ease-in-enter;
`

const BreadCrumbTitle = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  margin: 0.5rem 0;
`

const PageTitle = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
`

export function PageHeader({
  breadCrumbTitle = 'Brew with Lex',
  title,
}: PageHeaderProps) {
  const animationProps = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })
  return (
    <Container data-testid="page-header-container">
      <PageHeaderWrapper style={animationProps}>
        <BreadCrumbTitle>{breadCrumbTitle}</BreadCrumbTitle>
        <PageTitle>{title}</PageTitle>
      </PageHeaderWrapper>
    </Container>
  )
}
