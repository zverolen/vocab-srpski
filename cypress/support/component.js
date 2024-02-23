// Import commands.js using ES2015 syntax:
import './commands'
import '../../src/index.css'

import { Provider } from 'react-redux'
import { store } from '../../src/store/store'
import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', (component, options = {}) => {
  const { ...mountOptions } = options

  const wrapped = <Provider store={store}>{component}</Provider>

  return mount(wrapped, mountOptions)
})