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

describe('<Button />', () => {
  it('Default variant renders correctly in all states', () => {
    cy.mount(
      <div className='disclosure'>
        <ButtonWithIcon handleClick={() => {}} isExpanded={false}>
          Инструкция
        </ButtonWithIcon>
      </div>
    )
    cy.get('button').should('have.text', 'Инструкция')
    
    cy.get('button')
      .should('have.css', 'border', `1px solid ${color_reference.white}`)
      .and('have.css', 'color', color_reference.white)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'min-height', '44px')

    cy.get('button').find('circle')
      .should('have.css', 'stroke', color_reference.white)
    
    cy.get('button').find('rect:nth-of-type(1)')
      .should('have.css', 'fill', color_reference.redDarkTheme)

    cy.get('button').find('rect:nth-of-type(2)')
      .should('have.css', 'fill', color_reference.white)
    
    cy.get('button').focus()

    cy.wait(300)
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.black} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'color', color_reference.black)

    cy.get('button').find('circle')
      .should('have.css', 'stroke', color_reference.black)

    cy.get('button').find('rect:nth-of-type(2)')
      .should('have.css', 'fill', color_reference.black)
  })

  it('Renders correctly whith expanded state (opened disclosure)', () => {
    cy.mount(
      <div className='disclosure'>
        <ButtonWithIcon handleClick={() => {}} isExpanded={true}>
          Инструкция
        </ButtonWithIcon>
      </div>
    )
  
    cy.get('svg').should('have.class', 'minus')
  })
})