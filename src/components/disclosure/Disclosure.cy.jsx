import Disclosure from './Disclosure'
import Toggle from '../toggle/Toggle'

const sample_children = <Toggle on={false}/>

describe('<Disclusure />', () => {
  it('renders', () => {
    cy.mount(<Disclosure>{sample_children}</Disclosure>)
    cy.getByTest('button-menu').should('have.text', 'Меню')

    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Закрыть меню')
    cy.getByTest('toggle').should('exist')

    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Меню')
  })
})