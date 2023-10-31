import ButtonWithIcon2 from './ButtonWithIcon2'

const color_reference = {
  black: 'rgb(33, 33, 33)',
  white: 'rgb(255, 255, 255)',
  greyDark: 'rgb(51, 51, 51)',
  greyMedium: 'rgb(133, 133, 133)',
  greyLight: 'rgb(235, 235, 235)',
  greenDark: 'rgb(51, 84, 79)',
  greenLight: 'rgb(242, 252, 251)',
  redDark: 'rgb(128, 49, 63)',
  redLight: 'rgb(252, 245, 246)'
}

describe('<ButtonWithIcon2 />', () => {
  it.only('Default variant renders correctly in all states', () => {
    cy.mount(
      <div className='disclosure'>
        <ButtonWithIcon2 handleClick={() => {}} isExpanded={false}>
          Инструкция
        </ButtonWithIcon2>
      </div>
    )
    cy.get('button').should('have.text', 'Инструкция')
    
    cy.get('button')
      .should('have.css', 'border', `0px ${color_reference.white}`)
      .and('have.css', 'background-color', color_reference.black)

    cy.get('span').should('have.css', 'text-decoration', `${color_reference.white}`)
    
    cy.get('button').focus()

    cy.get('button')
      .should('have.css', 'outline-color', color_reference.black)
      .and('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
  })
})