import ButtonDefault from "./ButtonDefault"

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

describe('<ButtonDefault />', () => {
  it('Renders correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}} >Показать ответ</ButtonDefault>)
    cy.get('button').should('have.text', 'Показать ответ')
    cy.get('button')
      .should('have.css', 'border', `1px solid ${color_reference.white}`)
      .and('have.css', 'color', color_reference.white)
      .and('have.css', 'background-color', color_reference.black)
  })

  it('Has styles on focus', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.black} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'color', color_reference.black)
  })

  it('Correct button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" handleClick={()=>{}}>Верно</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'color', color_reference.greenLight)
      .and('have.css', 'border-color', color_reference.greenLight)
      .and('have.css', 'background-color', color_reference.greenDark)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.greenLight} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.greenLight)
      .and('have.css', 'color', color_reference.greenDark)
  })

  it('Wrong button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="wrong" handleClick={()=>{}}>Неверно</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'color', color_reference.redLight)
      .and('have.css', 'border-color', color_reference.redLight)
      .and('have.css', 'background-color', color_reference.redDark)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.redLight} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.redLight)
      .and('have.css', 'color', color_reference.redDark)
  })

  it('Default disabled button is rendered correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'background-color', color_reference.greyDark)
      .and('have.css', 'color', color_reference.greyMedium)
      .and('have.css', 'border-color', color_reference.greyMedium)
  })

  it('Correct disabled button is rendered correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'background-color', color_reference.greyDark)
      .and('have.css', 'color', color_reference.greyMedium)
      .and('have.css', 'border-color', color_reference.greyMedium)
  })
})