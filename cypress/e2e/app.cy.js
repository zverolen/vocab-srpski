const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('Working with the app, controls hidden in the menu', () => {
  it('Keyboard-based navigation with clicks instead of presses (limitation)', () => {
    cy.visit('/')
    cy.getByTest('button-menu').should('have.text', 'Меню')
    
    cy.getByTest('button-menu').focus()
    cy.getByTest('button-menu')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
      cy.getByTest('button-menu').find('svg').should('have.css', 'fill', 'rgba(0, 0, 0, 0.87)')

    // Open menu
    cy.getByTest('button-menu').click()

    cy.getByTest('button-menu')
      .should('have.text', 'Закрыть меню')
      .and('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
    cy.getByTest('button-toggle').should('have.text', 'Автоматическая сортировка карточекВыключеноВыкл')
    cy.getByTest('hint').should('have.text', 'Последовательность при автоматической сортировке: сначала карточки без ответа, затем верный ответ, затем неверный ответ')

    cy.getByTest('button-toggle').focus()
    cy.getByTest('button-toggle')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')

    // Toggle auto sorting
    cy.getByTest('button-toggle').click()

    // Visual changes of the controls
    cy.getByTest('toggle').find('div')
      .should('have.css', 'background-color', `${color_reference.correctHumble}`)
      .and('have.css', 'border-color', `${color_reference.correct}`)
      .and('have.css', 'flex-direction', 'row-reverse')

    cy.getByTest('button-toggle').should('have.text', 'Автоматическая сортировка карточекВключеноВкл')

    //Exit the menu
    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Меню')

  })

  it('Alternative flow for click navigation, shallow checks', () => {
    cy.visit('/')

    //Open menu
    cy.getByTest('button-menu').click()

    cy.getByTest('button-menu').should('have.text', 'Закрыть меню')
    cy.getByTest('button-toggle').should('have.text', 'Автоматическая сортировка карточекВыключеноВыкл')

    // Toggle auto sorting
    cy.getByTest('button-toggle').click()

    cy.getByTest('toggle').find('div')
      .should('have.css', 'background-color', `${color_reference.correctHumble}`)
      .and('have.css', 'border-color', `${color_reference.correct}`)
      .and('have.css', 'flex-direction', 'row-reverse')

    cy.getByTest('button-toggle').should('have.text', 'Автоматическая сортировка карточекВключеноВкл')

    // Close menu
    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Меню')
  })

  it('Screen readers compatibility check', () => {
    cy.visit('/')

    cy.getByTest('disclusure').should('have.attr', 'aria-live', 'polite')

    // Generic reveal the menu content
    cy.getByTest('button-menu').click() 

    cy.get('header').find('h2')
      .should('have.text', 'Настройки отображения карточек')
      .and('have.class', 'visually-hidden')
    
    cy.getByTest('button-toggle')
      .should('have.attr', 'aria-pressed', 'false')
      .and('have.attr', 'aria-describedby'), 'autosort-description'

    cy.getByTest('toggle').should('have.attr', 'aria-hidden', 'true')

    // Generic toggle autosort
    cy.getByTest('button-toggle').click()

    cy.getByTest('button-toggle')
      .should('have.attr', 'aria-pressed', 'true')

  })
  
})