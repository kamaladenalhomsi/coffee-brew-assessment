import { Route } from 'wouter'
import { Start, SelectStyle } from 'views/index'
import { ChoicesProvider } from 'contexts/ChoicesContext'

export default function Main() {
  return (
    <ChoicesProvider>
      <Route path="/" component={Start}></Route>
      <Route path="/select-style" component={SelectStyle}></Route>
    </ChoicesProvider>
  )
}
