import CardsItem from './CardsItem'

const example = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'unset'
}

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

describe('<CardsItem />', () => {
  it('Renders correctly', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)
    
    // Check if the structure is the same
    cy.getByTest('container-card').children().should('have.length', 5)

    cy.getByTest('container-card').should('have.css', 'width', '248px')
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.primary)
    cy.getByTest('container-card').should('have.css', 'padding', '16px 20px')

    cy.get('hr + h4 + div').should('have.css', 'display', 'flex')
    cy.get('hr + h4 + div').should('have.css', 'gap', '16px')

    cy.getByTest('text-phrase').find('span:first-child').should('have.text', 'Это твоя книга?')
    cy.getByTest('text-phrase').find('span:last-child')
      .should('have.text', 'Da li je ovo tvoja knjiga?')
      .and('not.be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Показать ответ')
    cy.getByTest('button-correct')
      .should('exist')
      .and('have.text', 'Верно')
      .and('be.disabled')
      .and('have.class', 'correct')
    cy.getByTest('button-wrong')
      .should('exist')
      .and('have.text', 'Неверно')
      .and('be.disabled')
      .and('have.class', 'wrong')
  })

  it('Shows and hides the answer', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Reveal the phrase in serbian
    cy.getByTest('button-answer').click()

    cy.getByTest('text-phrase').find('span:first-child').should('not.be.visible')
    cy.getByTest('text-phrase').find('span:last-child').should('be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Скрыть ответ')
    cy.getByTest('button-correct').should('not.be.disabled')
    cy.getByTest('button-wrong').should('not.be.disabled')
    
    // Reveal the phrase in russian
    cy.getByTest('button-answer').click()

    cy.getByTest('text-phrase').find('span:first-child').should('be.visible')
    cy.getByTest('text-phrase').find('span:last-child').should('not.be.visible')
    cy.getByTest('button-correct').should('be.disabled')
    cy.getByTest('button-wrong').should('be.disabled')
  })

  //!! Looks like some tests fail because it is a controlled element
  // This behavior is tested in E2E-tests for now
  it.skip('Checks the answer and resets', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Clicked "correct" button
    cy.getByTest('button-answer').click()
    cy.getByTest('button-correct').click()

    // Check that the correct/wrong buttons disappear
    cy.get('hr + h4 + div').children().should('have.length', '2')
    cy.getByTest('button-reset').should('exist').and('have.text', 'Сбросить')
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.correct)
    cy.getByTest('check-status-correct').should('exist')
    cy.getByTest('check-status-correct').parent().parent().should('have.css', 'display', 'flex')


    // Reset
    cy.getByTest('button-reset').click()
    cy.getByTest('text-phrase').should('have.text', 'Это твоя книга?')
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.primary)
    cy.getByTest('button-correct').should('exist')
    cy.getByTest('button-wrong').should('exist')

    //Clicked "wrong" button
    cy.getByTest('button-answer').click()
    cy.getByTest('button-wrong').click()
    cy.get('hr + h4 + div').children().should('have.length', '1')
    cy.getByTest('button-reset').should('exist').and('have.text', 'Сбросить')
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.wrong)
    cy.getByTest('check-status-wrong').should('exist')
    cy.getByTest('check-status-wrong').parent().parent().should('have.css', 'display', 'flex')

    //Reset
    cy.getByTest('button-reset').click()
    cy.getByTest('text-phrase').should('have.text', 'Это твоя книга?')
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.primary)
  })
  
  // Fail because of the same issue
  it.skip('Focus state is emulated correctly', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Card is "focused" when buttons are focused
    cy.getByTest('button-answer').focus()
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
    cy.getByTest('button-answe').click()

    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
    cy.getByTest('button-correc').click()

    // Check for the Correct button
    cy.getByTest('button-reset').should('be.focused')
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.correct} 0px 0px 0px 8px`)

    //Reset
    cy.getByTest('button-reset').click()
    cy.getByTest('button-reset').should('not.be.visible').and('not.be.focused')
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
    cy.getByTest('button-answer').should('be.focused')

    //Check for the Wrong button
    cy.getByTest('button-answer').click()

    cy.getByTest('button-wrong').click()
    cy.getByTest('button-reset').should('be.focused')
    cy.getByTest('container-card')
    .should('have.css', 'box-shadow', `${color_reference.correct} 0px 0px 0px 8px`)

    //Reset
    cy.getByTest('button-reset').click()
    cy.getByTest('button-reset').should('not.be.visible').and('not.be.focused')
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
    cy.getByTest('button-answer').should('be.focused')
  })
})