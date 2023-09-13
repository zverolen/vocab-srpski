// Import commands.js using ES2015 syntax:
import './commands'
import '../../src/index.css'


import { mount } from 'cypress/react18'

Cypress.Commands.add('mount', mount)