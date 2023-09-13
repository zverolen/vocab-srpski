import ButtonWithToggle from './ButtonWithToggle'

describe('<ButtonWithToggle />', () => {
  it('renders', () => {
    cy.mount(<ButtonWithToggle />)
    cy.get('button')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
    
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
  })
})