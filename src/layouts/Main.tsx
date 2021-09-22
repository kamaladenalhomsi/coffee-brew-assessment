import { Route } from 'wouter'
import {
  Start,
  SelectStyle,
  SelectSize,
  Overview,
  SelectExtras,
  ThankYou,
} from 'views/index'
import { ChoicesProvider } from 'contexts/ChoicesContext'

export default function Main() {
  return (
    <ChoicesProvider>
      <Route path="/" component={Start}></Route>
      <Route path="/select-style" component={SelectStyle}></Route>
      <Route path="/select-size" component={SelectSize}></Route>
      <Route path="/select-extras" component={SelectExtras}></Route>
      <Route path="/overview" component={Overview}></Route>
      <Route path="/thank-you" component={ThankYou}></Route>
    </ChoicesProvider>
  )
}
