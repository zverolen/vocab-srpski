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
    cy.getByTest('container-card').children().should('have.length', 2)

    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.white)

    cy.getByTest('text-phrase').find('p:first-child').should('have.text', 'Это твоя книга?')
    cy.getByTest('text-phrase').find('p:last-child')
      .should('have.text', 'Da li je ovo tvoja knjiga?')
      .and('not.be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Показать ответ')
    cy.getByTest('button-correct')
      .should('exist')
      .and('have.text', 'Знаю')
      .and('be.disabled')
      .and('have.class', 'correct')
    cy.getByTest('button-wrong')
      .should('exist')
      .and('have.text', 'Учу')
      .and('be.disabled')
      .and('have.class', 'wrong')
  })

  it('Shows and hides the answer', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Reveal the phrase in serbian
    cy.getByTest('button-answer').click()

    cy.getByTest('text-phrase').find('p:first-child').should('not.be.visible')
    cy.getByTest('text-phrase').find('p:last-child').should('be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Скрыть ответ')
    cy.getByTest('button-correct').should('not.be.disabled')
    cy.getByTest('button-wrong').should('not.be.disabled')
    
    // Reveal the phrase in russian
    cy.getByTest('button-answer').click()

    cy.getByTest('text-phrase').find('p:first-child').should('be.visible')
    cy.getByTest('text-phrase').find('p:last-child').should('not.be.visible')
    cy.getByTest('button-correct').should('be.disabled')
    cy.getByTest('button-wrong').should('be.disabled')
  })

  it('Marks card as correct with click', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Clicked "correct" button
    cy.getByTest('button-answer').click()
    cy.getByTest('button-correct').click()

    // Check that the correct/wrong buttons disappear
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.greenDarkTheme)
  })

  it('Marks card as wrong with click', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Clicked "wrong" button
    cy.getByTest('button-answer').click()
    cy.getByTest('button-wrong').click()

    // Check that the correct/wrong buttons disappear
    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.redDarkTheme)
  })
  
  it('Focus state is emulated correctly', () => {
    cy.mount(<CardsItem data={example} onCheckStatusChange={()=>{}} />)

    // Card is "focused" when buttons are focused
    cy.getByTest('button-answer').focus()
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 8px`)
    cy.getByTest('button-answer').click()

    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 8px`)
  })
})