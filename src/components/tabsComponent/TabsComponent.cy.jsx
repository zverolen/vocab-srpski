import TabsComponent from './TabsComponent'

const tabsReference = [
  { id: '0', caption: 'Без ответа' },
  { id: '1', caption: 'Верно' },
  { id: '2', caption: 'Неверно' }
]

const tabpanelReference = [
  {id: '0', tempContent: 'CONTENT TABPANEL 1'},
  {id: '1', tempContent: 'CONTENT TABPANEL 2'},
  {id: '2', tempContent: 'CONTENT TABPANEL 3'}
]

describe('<TabsComponent />', () => {
  it('Renders correctly with the first tab active', () => {
    cy.mount(
      <TabsComponent tabs={ tabsReference } tabpanels={ tabpanelReference } />
    )

    cy.getByTest('tablist')
      .should('have.attr', 'role', 'tablist')
      .and('have.attr', 'aria-labelledby', 'tabs-heading')
    cy.get('h2')
      .should('have.text', 'Фразы на сербском')
      .and('have.attr', 'id', 'tabs-heading')

    // Check that the first tab is active
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 1')

  })

  it('Navigation works correctly', () => {
    cy.mount(
      <TabsComponent tabs={ tabsReference } tabpanels={ tabpanelReference } />
    )

    //Select the second tab
    cy.get('button:first-child').focus()
    cy.get('button:nth-child(2)').focus()

    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 2')

    //Select the third tab
    cy.get('button:nth-child(3)').focus()

    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 3')

    //Click the first tab
    cy.get('button:nth-child(1)').click()

    cy.get('button:nth-child(1)').should('be.focused')
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 1')

    //Click the second tab
    cy.get('button:nth-child(2)').click()

    cy.get('button:nth-child(2)').should('be.focused')
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 2')

    //Click the second tab
    cy.get('button:nth-child(2)').click()

    cy.get('button:nth-child(2)').should('be.focused')
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 2')

    //Click the second tab
    cy.get('button:nth-child(3)').click()

    cy.get('button:nth-child(3)').should('be.focused')
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 3')
  })
})