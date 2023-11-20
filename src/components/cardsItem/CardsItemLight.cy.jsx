//Developement Note: I wasn't able to stub the methods that make changes in the card, for now.
// The actual behavior is tested in the end-to-end test of the app.
import CardsItem from './CardsItem'

const defaultPhraseRu = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'withoutAnswer',
  isRussian: true
}

const defaultPhraseRs = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'withoutAnswer',
  isRussian: false
}

const correctPhraseRs = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'correct',
  isRussian: false
}

const wrongPhraseRs = {
  id: '1',
  serbian: 'Da li je ovo tvoja knjiga?',
  russian: 'Это твоя книга?',
  section: 'R1',
  selfCheckStatus: 'wrong',
  isRussian: false
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
    const onLanguageChangeSpy = cy.spy().as('onLanguageChangeSpy')
    
    cy.mount(<CardsItem data={defaultPhraseRu} onCheckStatusChange={()=>{}} onLanguageChange={onLanguageChangeSpy} />)
    
    // Check if the structure is the same
    cy.getByTest('container-card').children().should('have.length', 2)

    cy.getByTest('container-card').should('have.css', 'border-color', color_reference.black)

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

    cy.getByTest('button-reset').should('not.be.visible')

    cy.getByTest('button-answer').click()
    cy.get('@onLanguageChangeSpy').should('have.been.called')

  })

  it('Renders correctly when "Show answer" button has been clicked', () => {
    const onCheckStatusChangeSpy = cy.spy().as('onCheckStatusChangeSpy')

    cy.mount(<CardsItem data={defaultPhraseRs} onCheckStatusChange={onCheckStatusChangeSpy} onLanguageChange={()=>{}} />)

    cy.getByTest('text-phrase').find('p:first-child').should('not.be.visible')
    cy.getByTest('text-phrase').find('p:last-child')
      .should('have.text', 'Da li je ovo tvoja knjiga?')
      .and('be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Скрыть ответ')
    cy.getByTest('button-correct')
      .should('exist')
      .and('not.be.disabled')
    cy.getByTest('button-wrong')
      .should('exist')
      .and('not.be.disabled')
    
    cy.getByTest('button-correct').click()
    cy.get('@onCheckStatusChangeSpy').should('have.been.called')
    cy.getByTest('button-wrong').click()
    cy.get('@onCheckStatusChangeSpy').should('have.been.called')
  })

  it('Renders correctly after "Correct" button has been clicked', () => {
    cy.mount(<CardsItem data={correctPhraseRs} onCheckStatusChange={()=>{}} onLanguageChange={()=>{}} />)

    cy.getByTest('text-phrase').find('p:first-child').should('not.be.visible')
    cy.getByTest('text-phrase').find('p:last-child').should('be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Скрыть ответ')
    cy.getByTest('button-reset').should('be.visible')
    cy.get('.card').should('have.css', 'border-color', color_reference.greenLightTheme)
  })

  it('Renders correctly after "Wrong" button has been clicked', () => {
    const onCheckStatusChangeSpy = cy.spy().as('onCheckStatusChangeSpy')
    cy.mount(<CardsItem data={wrongPhraseRs} onCheckStatusChange={onCheckStatusChangeSpy} onLanguageChange={()=>{}} />)

    cy.getByTest('text-phrase').find('p:first-child').should('not.be.visible')
    cy.getByTest('text-phrase').find('p:last-child').should('be.visible')
    
    cy.getByTest('button-answer').should('have.text', 'Скрыть ответ')
    cy.getByTest('button-reset').should('be.visible')
    cy.get('.card').should('have.css', 'border-color', color_reference.redLightTheme)
    
    cy.getByTest('button-reset').click()
    cy.get('@onCheckStatusChangeSpy').should('have.been.called')
  })
  
  it('Focus state is emulated correctly', () => {
    cy.mount(<CardsItem data={defaultPhraseRu} onCheckStatusChange={()=>{}} onLanguageChange={()=>{}} />)

    // Card is "focused" when buttons are focused
    cy.getByTest('button-answer').focus()
    cy.getByTest('container-card')
      .should('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
  })
})