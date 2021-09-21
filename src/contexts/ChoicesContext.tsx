import {
  createContext,
  FC,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from 'react'

interface Choice {
  label: string
  value: string
}

interface Choices {
  style?: Choice
  size?: Choice
  extras?: Choice
}

interface ChoicesContext {
  choices: Choices
  setChoices: Dispatch<SetStateAction<Choices>>
}

interface UseChoices extends ChoicesContext {
  addChoice: (choices: Choices) => void
}

const ChoicesContext = createContext<ChoicesContext | {}>({})

const ChoicesProvider: FC = ({ children }) => {
  const [choices, setChoices] = useState<Choices>({})

  return (
    <ChoicesContext.Provider value={{ choices, setChoices }}>
      {children}
    </ChoicesContext.Provider>
  )
}

const useChoices = (): UseChoices => {
  const { choices, setChoices } = useContext(ChoicesContext) as ChoicesContext

  const addChoice = (choice: Choices): void => {
    console.log(choice, 'choice')
    setChoices((oldChoices: Choices) => ({
      ...oldChoices,
      ...choice,
    }))
  }

  if (typeof choices === undefined) {
    throw Error('useChoices must be used within ChoicesProvider')
  }

  return {
    choices,
    setChoices,
    addChoice,
  }
}

export { useChoices, ChoicesProvider }
