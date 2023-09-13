import HideAndReveal from './HideAndReveal'
import Toggle from '../toggle/Toggle'

const sample_children = <Toggle on={false}/>

describe('<HideAndReveal />', () => {
  it('renders', () => {
    cy.mount(<HideAndReveal>{sample_children}</HideAndReveal>)
    cy.get('[data-testid="button-menu"]').should('have.text', 'Меню')

    cy.get('[data-testid="button-menu"]').click()
    cy.get('[data-testid="button-menu"]').should('have.text', 'Закрыть меню')
    cy.get('[data-testid="toggle"]').should('exist')

    cy.get('[data-testid="button-menu"]').click()
    cy.get('[data-testid="button-menu"]').should('have.text', 'Меню')
  })
})