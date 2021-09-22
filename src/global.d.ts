// import { RadioGroupProps } from '@react-types/radio'
interface Global {
  checkIfExistByTestId: (testId: string) => void
}

declare module '@react-stately/radio' {
  interface RadioGroupProps {
    defaultValue: {}
  }
  export interface RadioGroupState {
    /**
     * The name for the group, used for native form submission.
     * @deprecated
     * @private
     */
    readonly name: string
    /** Whether the radio group is disabled. */
    readonly isDisabled: boolean
    /** Whether the radio group is read only. */
    readonly isReadOnly: boolean
    /** The currently selected value. */
    readonly selectedValue: {}
    /** Sets the selected value. */
    setSelectedValue(value: {}): void
    /** The value of the last focused radio. */
    readonly lastFocusedValue: string | null
    /** Sets the last focused value. */
    setLastFocusedValue(value: {}): void
  }
  /**
   * Provides state management for a radio group component. Provides a name for the group,
   * and manages selection and focus state.
   */
  export function useRadioGroupState(props: RadioGroupProps): RadioGroupState

  //# sourceMappingURL=types.d.ts.map
}

declare var global: Global
