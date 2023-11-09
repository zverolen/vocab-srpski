import TabsComponent from './TabsComponent'

const tabsReference = [
  { id: '0', caption: 'Без ответа' },
  { id: '1', caption: 'Знаю' },
  { id: '2', caption: 'Учу' }
]

const tabpanelReference = [
  {
      "id": "1",
      "serbian": "Da li je ovo tvoja knjiga?",
      "russian": "Это твоя книга?",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "2",
      "serbian": "To nije njegov sat.",
      "russian": "Это не его часы.",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "3",
      "serbian": "To je moje dete.",
      "russian": "Это мой ребёнок.",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "4",
      "serbian": "To je tvoja sestra.",
      "russian": "Это твоя сестра.",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "5",
      "serbian": "To je njegova kuća.",
      "russian": "Это его дом.",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "6",
      "serbian": "Ovo je moj dobar drug.",
      "russian": "Это мой хороший друг.",
      "section": "R1",
      "selfCheckStatus": "unset"
  },
  {
      "id": "7",
      "serbian": "Šta je tvoja sestra?",
      "russian": "Кем работает твоя сестра?",
      "section": "R1",
      "selfCheckStatus": "unset"
  }
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