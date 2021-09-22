import { FC, CSSProperties } from 'react'
import styled from 'styled-components'

interface CheckmarkProps {
  isSelected: any
}

const CheckMarkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const WhiteCircle = styled.img`
  width: 24px;
  height: 24px;
`

const WhiteCheckMark = styled.img`
  position: absolute;
  width: 10px;
`

export const Checkmark: FC<CheckmarkProps> = ({ isSelected }) => (
  <CheckMarkWrapper aria-hidden="true">
    <WhiteCircle src={require('assets/images/white-circle.svg').default} />
    {isSelected && (
      <WhiteCheckMark
        src={require('assets/images/white-checkmark.svg').default}
      />
    )}
  </CheckMarkWrapper>
)
