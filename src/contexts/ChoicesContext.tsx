import {
  createContext,
  FC,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from 'react'

export interface Choice {
  title?: string
  value?: string
  icon?: string | undefined
  editLink?: string
}

export interface ChoiceWithSubChoices extends Choice {
  subChoices?: SubChoice[]
}

export interface SubChoice {
  title: string
  value: string
}

export interface Choices {
  style: Choice | {}
  size: Choice | {}
  extras: Array<ChoiceWithSubChoices>
}

type SubChoicesKeys = 'extras'
interface addChoiceParam {
  style?: Choice | {}
  size?: Choice | {}
}

type pushSubChoiceType = (
  key: SubChoicesKeys,
  choiceWithSubChoices: ChoiceWithSubChoices
) => void

type addChoiceType = (choiceWithKey: addChoiceParam) => void

interface ChoicesContextType {
  choices: Choices
  setChoices: Dispatch<SetStateAction<Choices>>
}

interface UseChoices extends ChoicesContextType {
  addChoice: addChoiceType
  pushSubChoice: pushSubChoiceType
}

const ChoicesContext = createContext<ChoicesContextType | {}>({})

const ChoicesProvider: FC = ({ children }) => {
  const [choices, setChoices] = useState<Choices>({
    style: {},
    size: {},
    extras: [],
  })

  return (
    <ChoicesContext.Provider value={{ choices, setChoices }}>
      {children}
    </ChoicesContext.Provider>
  )
}

const useChoices = (): UseChoices => {
  const { choices, setChoices } = useContext(
    ChoicesContext
  ) as ChoicesContextType

  const addChoice: addChoiceType = (choice) => {
    setChoices((oldChoices: Choices) => ({
      ...oldChoices,
      ...choice,
    }))
  }

  const pushSubChoice: pushSubChoiceType = (key, choiceWithSubChoices) => {
    setChoices((oldChoices: Choices) => {
      const cloned = Object.assign({}, oldChoices)
      const subChoiceIndex = cloned[key].findIndex(
        (ch) => ch.value === choiceWithSubChoices.value
      )
      if (subChoiceIndex < 0) {
        // add choice if it is not already added
        cloned[key].push(choiceWithSubChoices)
      } else {
        if (
          JSON.stringify(cloned[key][subChoiceIndex]) ===
          JSON.stringify(choiceWithSubChoices)
        ) {
          // remove choice if the same choice is passed again (the user tapped again)
          cloned[key].splice(subChoiceIndex, 1)
        } else {
          // reassign choice if choice of the same type is sent again
          cloned[key][subChoiceIndex] = choiceWithSubChoices
        }
      }
      return cloned
    })
  }

  if (typeof choices === undefined) {
    throw Error('useChoices must be used within ChoicesProvider')
  }

  return {
    choices,
    setChoices,
    addChoice,
    pushSubChoice,
  }
}

export { useChoices, ChoicesProvider, ChoicesContext }
