import ButtonDefault from "./ButtonDefault"

const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('<ButtonDefault />', () => {
  it('Renders correctly', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.text', 'Показать ответ')
    cy.get('button').should('have.css', 'border', `1px solid ${color_reference.primary}`)
  })

  it('Has styles on focus', () => {
    cy.mount(<ButtonDefault test="button-answer" handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.secondary} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
  })

  it('Correct button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" handleClick={()=>{}}>Верно</ButtonDefault>)
    cy.get('button').should('have.css', 'color', color_reference.correct)
    cy.get('button').should('have.css', 'border-color', color_reference.correct)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.correct} 0px 0px 0px 8px`)
  })

  it('Wrong button renders correctly (default and focus)', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="wrong" handleClick={()=>{}}>Неверно</ButtonDefault>)
    cy.get('button').should('have.css', 'color', color_reference.wrong)
    cy.get('button').should('have.css', 'border-color', color_reference.wrong)
    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'box-shadow', `${color_reference.wrong} 0px 0px 0px 8px`)
  })

  it('Default button: disabled state is correct', () => {
    cy.mount(<ButtonDefault test="button-answer" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.css', 'color', color_reference.humble)
    cy.get('button').should('have.css', 'border-color', color_reference.humble)
  })

  it('Correct button: disabled state is correct', () => {
    cy.mount(<ButtonDefault test="button-answer" checkStatus="correct" disabled handleClick={()=>{}}>Показать ответ</ButtonDefault>)
    cy.get('button').should('have.css', 'color', color_reference.humble)
    cy.get('button').should('have.css', 'border-color', color_reference.humble)
  })
})