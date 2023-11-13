import ButtonWithIcon from './ButtonWithIcon'

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

describe('<ButtonWithIcon />', () => {
  it.only('Default variant renders correctly in all states', () => {
    cy.mount(
      <div className='disclosure'>
        <ButtonWithIcon handleClick={() => {}} isExpanded={false}>
          Инструкция
        </ButtonWithIcon>
      </div>
    )
    cy.get('button').should('have.text', 'Инструкция')
    
    cy.get('button')
      .should('have.css', 'border', `0px ${color_reference.black}`)
      .and('have.css', 'background-color', color_reference.white)

    cy.get('span').should('have.css', 'text-decoration', `${color_reference.black}`)
    
    cy.get('button').focus()

    cy.get('button')
      .should('have.css', 'outline-color', color_reference.white)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'color', color_reference.black)
  })
})