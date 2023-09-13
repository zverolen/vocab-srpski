import ButtonDefault from "./ButtonDefault"

describe('<ButtonDefault />', () => {
  it('Renders correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.text', 'Показать ответ')
    cy.get('button').should('have.css', 'border', '1px solid rgba(0, 0, 0, 0.87)')
  })

  it('Has styles on focus', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
  })

  it('Correct button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" handleClick={()=>{}}>Верно</ButtonDefault>)
    cy.get('button').should('have.css', 'color', 'rgb(62, 101, 75)')
    cy.get('button').should('have.css', 'border-color', 'rgb(62, 101, 75)')
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', 'rgb(62, 101, 75) 0px 0px 0px 8px')
  })

  it('Wrong button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="wrong" handleClick={()=>{}}>Неверно</ButtonDefault>)
    cy.get('button').should('have.css', 'color', 'rgb(164, 65, 65)')
    cy.get('button').should('have.css', 'border-color', 'rgb(164, 65, 65)')
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', 'rgb(164, 65, 65) 0px 0px 0px 8px')
  })

  it('Default button: disabled state is correct', () => {
    cy.mount(<ButtonDefault test="button-answer" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.css', 'color', 'rgba(0, 0, 0, 0.4)')
    cy.get('button').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.4)')
  })

  it('Correct button: disabled state is correct', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.css', 'color', 'rgba(0, 0, 0, 0.4)')
    cy.get('button').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.4)')
  })
})