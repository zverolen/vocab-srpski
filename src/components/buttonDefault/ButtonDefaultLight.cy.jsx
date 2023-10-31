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
      .should('have.css', 'border', `1px solid ${color_reference.black}`)
      .and('have.css', 'color', color_reference.black)
      .and('have.css', 'background-color', color_reference.white)
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
      .should('have.css', 'color', color_reference.greenDark)
      .and('have.css', 'border-color', color_reference.greenDark)
      .and('have.css', 'background-color', color_reference.greenLight)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.greenDark} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.greenDark)
      .and('have.css', 'color', color_reference.greenLight)
  })

  it('Wrong button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="wrong" handleClick={()=>{}}>Неверно</ButtonDefault>)
    cy.get('button')
      .should('have.css', 'color', color_reference.redDark)
      .and('have.css', 'border-color', color_reference.redDark)
      .and('have.css', 'background-color', color_reference.redLight)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.redDark} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.redDark)
      .and('have.css', 'color', color_reference.redLight)
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