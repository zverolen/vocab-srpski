import ButtonWithIcon from './ButtonWithIcon'

describe('<ButtonWithIcon />', () => {
  it('Default variant renders correctly in all states', () => {
    cy.mount(<ButtonWithIcon handleClick={() => {}} isOpen={false}/>)
    cy.get('button').should('have.text', 'Меню')
    cy.get('button').find('svg').should('exist').and('have.css', 'fill', 'rgba(0, 0, 0, 0.4)')
    cy.get('button')
      .should('have.css', 'border', '0px none rgba(0, 0, 0, 0.87)')
      .and('have.css', 'height', '48px')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.get('button').find('span span:first-child()').should('have.css', 'text-decoration', 'underline rgba(0, 0, 0, 0.87)')

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'color', 'rgba(0, 0, 0, 0.87)')
    cy.get('button').find('svg').should('have.css', 'fill', 'rgba(0, 0, 0, 0.87)')
  })

  it('Expanded menu variant renders correctrly in all states', () => {
    cy.mount(<ButtonWithIcon handleClick={() => {}} isOpen={true}/>)
    cy.get('button').should('have.text', 'Закрыть меню')
    cy.get('button').find('svg').should('exist').and('have.css', 'fill', 'rgba(0, 0, 0, 0.4)')
    cy.get('button')
      .should('have.css', 'border', '0px none rgba(0, 0, 0, 0.87)')
      .and('have.css', 'height', '48px')
    cy.get('button').find('span span:first-child()').should('have.css', 'text-decoration', 'underline rgba(0, 0, 0, 0.87)')

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)')
      .and('have.css', 'color', 'rgba(0, 0, 0, 0.87)')
    cy.get('button').find('svg').should('have.css', 'fill', 'rgba(0, 0, 0, 0.87)')
  })
})