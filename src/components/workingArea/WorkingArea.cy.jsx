import React from 'react'
import WorkingArea from './WorkingArea'

import { store } from '../../store/store'

describe('<WorkingArea />', () => {
  it('renders', () => {
   
    cy.mount(<WorkingArea />)
  })
})