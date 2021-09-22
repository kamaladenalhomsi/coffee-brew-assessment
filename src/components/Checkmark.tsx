import { FC, CSSProperties } from 'react'
import styled from 'styled-components'

interface CheckmarkProps {
  isSelected: any
  style: CSSProperties
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

export const Checkmark: FC<CheckmarkProps> = ({ isSelected, style }) => (
  <CheckMarkWrapper aria-hidden="true" style={style}>
    <WhiteCircle src={require('assets/images/white-circle.svg').default} />
    {isSelected && (
      <WhiteCheckMark
        src={require('assets/images/white-checkmark.svg').default}
      />
    )}
  </CheckMarkWrapper>
)
