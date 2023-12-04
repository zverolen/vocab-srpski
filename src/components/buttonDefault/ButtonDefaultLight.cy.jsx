import ButtonDefault from "./ButtonDefault"

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

describe('<ButtonDefault />', () => {
  it('Renders correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}} >Показать ответ</ButtonDefault>)
    cy.get('button').should('have.text', 'Показать ответ')
    cy.get('button')
      .should('have.css', 'border', `1px solid ${color_reference.black}`)
      .and('have.css', 'color', color_reference.black)
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'min-height', '44px')
  })

  it('Has styles on focus', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
  })

  it('Correct button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" handleClick={()=>{}}>Верно</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'color', color_reference.greenLightTheme)
      .and('have.css', 'border-color', color_reference.greenLightTheme)
      .and('have.css', 'background-color', color_reference.white)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.greenLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.greenLightTheme)
      .and('have.css', 'color', color_reference.white)
  })

  it('Wrong button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="wrong" handleClick={()=>{}}>Неверно</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'color', color_reference.redLightTheme)
      .and('have.css', 'border-color', color_reference.redLightTheme)
      .and('have.css', 'background-color', color_reference.white)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.redLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.redLightTheme)
      .and('have.css', 'color', color_reference.white)
  })

  it('Default disabled button is rendered correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'background-color', color_reference.greyLight)
      .and('have.css', 'color', color_reference.greyMedium)
      .and('have.css', 'border-color', color_reference.greyMedium)
  })

  it('Correct disabled button is rendered correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'background-color', color_reference.greyLight)
      .and('have.css', 'color', color_reference.greyMedium)
      .and('have.css', 'border-color', color_reference.greyMedium)
  })
})