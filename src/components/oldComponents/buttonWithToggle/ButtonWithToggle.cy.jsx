import ButtonWithToggle from './ButtonWithToggle'

const color_reference = {
  black: 'rgb(33, 33, 33)',
  white: 'rgb(250, 250, 250)',
  greyDark: 'rgb(51, 51, 51)',
  greyMedium: 'rgb(133, 133, 133)',
  greyLight: 'rgb(235, 235, 235)',
  greenDarkTheme: 'rgb(27, 196, 152)',
  greenLightTheme: 'rgb(9, 130, 104)',
  redDarkTheme: 'rgb(245, 95, 174)',
  redLightTheme: 'rgb(212, 40, 130)'
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