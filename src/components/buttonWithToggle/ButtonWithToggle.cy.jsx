import ButtonWithToggle from './ButtonWithToggle'

const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('<ButtonWithToggle />', () => {
  it('renders', () => {
    cy.mount(<ButtonWithToggle />)
    cy.get('button')
      .should('have.css', 'background-color', color_reference.secondary)
    
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'background-color', color_reference.secondary)
      .should('have.css', 'outline', `${color_reference.secondary} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
  })
})