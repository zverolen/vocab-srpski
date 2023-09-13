import Card from './CardsItem'
import { phrases } from '@/app/data/data'

const example = phrases[0]

describe('<Card />', () => {
  it('Renders correctly', () => {
    cy.mount(<Card data={example}/>)
    
    // Check if the structure is the same
    cy.get('[data-testid="container-card"]').children().should('have.length', 4)

    cy.get('[data-testid="container-card"]').should('have.css', 'width', '248px')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)')
    cy.get('[data-testid="container-card"]').should('have.css', 'padding', '16px 20px')

    cy.get('hr + div').should('have.css', 'display', 'flex')
    cy.get('hr + div').should('have.css', 'gap', '16px')

    cy.get('[data-testid="text-phrase"]').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="button-answer"]').should('have.text', 'Показать ответ')
    cy.get('[data-testid="button-correct"]')
      .should('exist')
      .and('have.text', 'Верно')
      .and('be.disabled')
      .and('have.class', 'correct')
    cy.get('[data-testid="button-wrong"]')
      .should('exist')
      .and('have.text', 'Неверно')
      .and('be.disabled')
      .and('have.class', 'wrong')
  })

  it('Shows and hides the answer', () => {
    cy.mount(<Card data={example}/>)

    cy.get('[data-testid="button-answer"]').click()
    cy.get('[data-testid="text-phrase"]').should('have.text', 'Da li je ovo tvoja knjiga?')
    cy.get('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('[data-testid="button-wrong"]').should('not.be.disabled')
    
    cy.get('[data-testid="button-answer"]').click()
    cy.get('[data-testid="text-phrase"]').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="button-correct"]').should('be.disabled')
    cy.get('[data-testid="button-wrong"]').should('be.disabled')
  })

  it('Checks the answer and resets', () => {
    cy.mount(<Card data={example}/>)

    // Clicked "correct" button
    cy.get('[data-testid="button-answer"]').click()
    cy.get('[data-testid="button-correct"]').click()

    cy.get('hr + div').children().should('have.length', '1')
    cy.get('[data-testid="button-reset"]').should('exist').and('have.text', 'Сбросить')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgb(62, 101, 75)')
    cy.get('[data-testid="check-status-correct"]').should('exist')
    cy.get('[data-testid="check-status-correct"]').parent().parent().should('have.css', 'display', 'flex')


    // Reset
    cy.get('[data-testid="button-reset"]').click()
    cy.get('[data-testid="text-phrase"]').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)')
    cy.get('[data-testid="button-correct"]').should('exist')
    cy.get('[data-testid="button-wrong"]').should('exist')

    //Clicked "wrong" button
    cy.get('[data-testid="button-answer"]').click()
    cy.get('[data-testid="button-wrong"]').click()
    cy.get('hr + div').children().should('have.length', '1')
    cy.get('[data-testid="button-reset"]').should('exist').and('have.text', 'Сбросить')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgb(164, 65, 65)')
    cy.get('[data-testid="check-status-wrong"]').should('exist')
    cy.get('[data-testid="check-status-wrong"]').parent().parent().should('have.css', 'display', 'flex')

    //Reset
    cy.get('[data-testid="button-reset"]').click()
    cy.get('[data-testid="text-phrase"]').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)')
  })

  it('Focus state is emulated correctly', () => {
    cy.mount(<Card data={example}/>)

    // Card is "focused" when buttons are focused
    cy.get('[data-testid="button-answer"]').focus()
    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
    cy.get('[data-testid="button-answer"]').click()

    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
    cy.get('[data-testid="button-correct"]').click()

    // Check for the Correct button
    cy.get('[data-testid="button-reset"]').should('be.focused')
    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgb(62, 101, 75) 0px 0px 0px 8px')

    //Reset
    cy.get('[data-testid="button-reset"]').click()
    cy.get('[data-testid="button-reset"]').should('not.be.visible').and('not.be.focused')
    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
    cy.get('[data-testid="button-answer"]').should('be.focused')

    //Check for the Wrong button
    cy.get('[data-testid="button-answer"]').click()

    cy.get('[data-testid="button-wrong"]').click()
    cy.get('[data-testid="button-reset"]').should('be.focused')
    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgb(164, 65, 65) 0px 0px 0px 8px')

    //Reset
    cy.get('[data-testid="button-reset"]').click()
    cy.get('[data-testid="button-reset"]').should('not.be.visible').and('not.be.focused')
    cy.get('[data-testid="container-card"]').should('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
    cy.get('[data-testid="button-answer"]').should('be.focused')
  })
})