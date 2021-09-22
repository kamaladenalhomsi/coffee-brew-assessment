import {
  FC,
  useRef,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from 'react'
import styled from 'styled-components'
import { Colors, Padding, Radius, Margin } from 'constants/cssValues'
import { useRadioGroupState } from '@react-stately/radio'
import { useRadioGroup, useRadio } from '@react-aria/radio'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { useFocusRing } from '@react-aria/focus'
import { SubChoice } from 'contexts/ChoicesContext'
import { Checkmark } from 'components'

interface RadioGroupElementProps {
  value: SubChoice
  presentational?: boolean
}

interface RadioWrapperProps {
  focused: boolean
  selected: boolean
  onClick: () => void
}

interface GroupProps {
  onChange?: (subChoiceValue: SubChoice) => void
}

const RadioWrapper = styled.div<RadioWrapperProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${Colors.GreenShade};
  padding: ${Padding.Four} ${Padding.Five};
  border-radius: ${Radius.LG};
  margin-bottom: ${Margin.Two};
  border: 1px solid ${(p) => (p.focused ? Colors.White : Colors.PrimaryGreen)};
  &:last-child {
    margin-bottom: 0;
  }
`

const RadioLabel = styled.label`
  color: ${Colors.White};
  font-weight: 600;
`

let RadioContext = createContext<any>({})

export const Group: FC<GroupProps> = (props) => {
  let { children } = props
  let state = useRadioGroupState({
    defaultValue: {},
  })
  let { radioGroupProps } = useRadioGroup({}, state)

  useEffect(() => {
    let passedValue = state.selectedValue
    if (typeof state.selectedValue === 'string') {
      passedValue = JSON.parse(state.selectedValue)
    }
    if (props.onChange) props.onChange(passedValue as SubChoice)
  }, [state.selectedValue])

  return (
    <div {...radioGroupProps}>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  )
}

export const Element: FC<RadioGroupElementProps> = (props) => {
  const { value } = props
  let state = useContext(RadioContext)
  let ref = useRef<null>(null)
  let { inputProps } = useRadio(value, state, ref)
  let { isFocusVisible, focusProps } = useFocusRing()
  let isSelected = useMemo((): boolean => {
    if (typeof state.selectedValue === 'string')
      state.selectedValue = JSON.parse(state.selectedValue)
    return state.selectedValue.value === value.value
  }, [JSON.stringify(state.selectedValue), value.value])
  return (
    <RadioWrapper
      onClick={() => state.setSelectedValue(value)}
      selected={isSelected}
      focused={isFocusVisible}
    >
      <RadioLabel>{props.children}</RadioLabel>
      {!props.presentational && (
        <VisuallyHidden>
          <input
            {...inputProps}
            {...focusProps}
            value={JSON.stringify(value)}
            ref={ref}
          />
        </VisuallyHidden>
      )}
      <Checkmark
        {...focusProps}
        isSelected={props.presentational ? true : isSelected}
      />
    </RadioWrapper>
  )
}
