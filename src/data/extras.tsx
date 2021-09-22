import { ChoiceWithSubChoices } from 'contexts/ChoicesContext'

const Extras: ChoiceWithSubChoices[] = [
  {
    title: 'Milk',
    icon: 'milk',
    value: 'milk',
    subChoices: [
      {
        title: 'Dairy',
        value: 'dairy',
      },
      {
        title: 'Soy',
        value: 'soy',
      },
      {
        title: 'Oat',
        value: 'oat',
      },
    ],
  },
  {
    title: 'Sugar',
    icon: 'cup-cappuccino',
    value: 'sugar',
  },
]

export default Extras
