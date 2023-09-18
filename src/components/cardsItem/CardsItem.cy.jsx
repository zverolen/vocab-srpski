import CardsItem from './CardsItem'

const example = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'unset'
}

describe('<CardsItem />', () => {
  it('Renders correctly', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)
    
    // Check if the structure is the same
    cy.get('[data-testid="container-card"]').children().should('have.length', 5)

    cy.get('[data-testid="container-card"]').should('have.css', 'width', '248px')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)')
    cy.get('[data-testid="container-card"]').should('have.css', 'padding', '16px 20px')

    cy.get('hr + h4 + div').should('have.css', 'display', 'flex')
    cy.get('hr + h4 + div').should('have.css', 'gap', '16px')

    cy.get('[data-testid="text-phrase"] span:first-child').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="text-phrase"] span:last-child')
      .should('have.text', 'Da li je ovo tvoja knjiga?')
      .and('not.be.visible')
    
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
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Reveal the phrase in serbian
    cy.get('[data-testid="button-answer"]').click()

    cy.get('[data-testid="text-phrase"] span:first-child').should('not.be.visible')
    cy.get('[data-testid="text-phrase"] span:last-child').should('be.visible')
    
    cy.get('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('[data-testid="button-wrong"]').should('not.be.disabled')
    
    // Reveal the phrase in russian
    cy.get('[data-testid="button-answer"]').click()

    cy.get('[data-testid="text-phrase"] span:first-child').should('be.visible')
    cy.get('[data-testid="text-phrase"] span:last-child').should('not.be.visible')
    cy.get('[data-testid="button-correct"]').should('be.disabled')
    cy.get('[data-testid="button-wrong"]').should('be.disabled')
  })

  //!! Looks like some tests fail because it is a controlled element
  // This behavior is tested in E2E-tests for now
  it.skip('Checks the answer and resets', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Clicked "correct" button
    cy.get('[data-testid="button-answer"]').click()
    cy.get('[data-testid="button-correct"]').click()

    // Check that the correct/wrong buttons disappear
    cy.get('hr + h4 + div').children().should('have.length', '2')
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
    cy.get('hr + h4 + div').children().should('have.length', '1')
    cy.get('[data-testid="button-reset"]').should('exist').and('have.text', 'Сбросить')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgb(164, 65, 65)')
    cy.get('[data-testid="check-status-wrong"]').should('exist')
    cy.get('[data-testid="check-status-wrong"]').parent().parent().should('have.css', 'display', 'flex')

    //Reset
    cy.get('[data-testid="button-reset"]').click()
    cy.get('[data-testid="text-phrase"]').should('have.text', 'Это твоя книга?')
    cy.get('[data-testid="container-card"]').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.87)')
  })
  
  // Fail because of the same issue
  it.skip('Focus state is emulated correctly', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

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