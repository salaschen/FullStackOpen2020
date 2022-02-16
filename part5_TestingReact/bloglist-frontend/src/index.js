import React from 'react'
import ReactDOM from 'react-dom'
import App, { store} from './App'

const renderApp = () => {
ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)