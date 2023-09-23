import HideAndReveal from './HideAndReveal'
import Toggle from '../toggle/Toggle'

const sample_children = <Toggle on={false}/>

describe('<HideAndReveal />', () => {
  it('renders', () => {
    cy.mount(<HideAndReveal>{sample_children}</HideAndReveal>)
    cy.getByTest('button-menu').should('have.text', 'Меню')

    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Закрыть меню')
    cy.getByTest('toggle').should('exist')

    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Меню')
  })
})