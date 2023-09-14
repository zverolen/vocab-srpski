describe('Working with the app', () => {
  it('Current flow with controls hidden in the menu', () => {
    cy.visit('/')
    cy.getByTest('button-menu').should('have.text', 'Меню')

    cy.getByTest('button-menu').focus()
    cy.getByTest('button-menu')
      .should('have.css', 'outline', 'rgb(255, 255, 255) solid 6px')
      .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.87) 0px 0px 0px 8px')
      cy.getByTest('button-menu').find('svg').should('have.css', 'fill', 'rgba(0, 0, 0, 0.87)')

    cy.getByTest('button-menu').click()
    cy.getByTest('button-menu').should('have.text', 'Закрыть меню')
    cy.getByTest('button-toggle').should('have.text', 'Автоматическая сортировка карточек')
  })
  // Click the button
  // See what's inside and new button name
  // Focus toggle button - see changes

  it('Alternative flow for screen readers', () => {
    
  })
  
})