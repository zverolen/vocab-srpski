import TabsComponent from './TabsComponent'

const tabsReference = [
  "Без ответа",
  "Знаю",
  "Учу"
]

const tabpanelReference1 = [
  {
      "id": "1",
      "serbian": "Da li je ovo tvoja knjiga?",
      "russian": "Это твоя книга?",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "2",
      "serbian": "To nije njegov sat.",
      "russian": "Это не его часы.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "3",
      "serbian": "To je moje dete.",
      "russian": "Это мой ребёнок.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "4",
      "serbian": "To je tvoja sestra.",
      "russian": "Это твоя сестра.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "5",
      "serbian": "To je njegova kuća.",
      "russian": "Это его дом.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "6",
      "serbian": "Ovo je moj dobar drug.",
      "russian": "Это мой хороший друг.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "7",
      "serbian": "Šta je tvoja sestra?",
      "russian": "Кем работает твоя сестра?",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  }
]

const tabpanelReference2 = [
  {
      "id": "2",
      "serbian": "To nije njegov sat.",
      "russian": "Это не его часы.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "3",
      "serbian": "To je moje dete.",
      "russian": "Это мой ребёнок.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "4",
      "serbian": "To je tvoja sestra.",
      "russian": "Это твоя сестра.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "5",
      "serbian": "To je njegova kuća.",
      "russian": "Это его дом.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "6",
      "serbian": "Ovo je moj dobar drug.",
      "russian": "Это мой хороший друг.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "7",
      "serbian": "Šta je tvoja sestra?",
      "russian": "Кем работает твоя сестра?",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  }
]

const tabpanelReference3 = [
  {
      "id": "1",
      "serbian": "Da li je ovo tvoja knjiga?",
      "russian": "Это твоя книга?",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "2",
      "serbian": "To nije njegov sat.",
      "russian": "Это не его часы.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "3",
      "serbian": "To je moje dete.",
      "russian": "Это мой ребёнок.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "4",
      "serbian": "To je tvoja sestra.",
      "russian": "Это твоя сестра.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  },
  {
      "id": "5",
      "serbian": "To je njegova kuća.",
      "russian": "Это его дом.",
      "section": "R1",
      "selfCheckStatus": "withoutAnswer"
  }
]

describe('<TabsComponent />', () => {
  it('Renders correctly with the first tab active', () => {
    cy.mount(
      <TabsComponent 
        tabs={ tabsReference }
        withoutAnswerPhrases={ tabpanelReference1 }
        correctPhrases={ tabpanelReference2 }
        wrongPhrases={ tabpanelReference3 }
        scoreAll='34'
        scoreCorrect='2'
        scoreWrong='4'
        onCheckStatusChange={()=>{}}
        updatedTab='correct'
      />
    )

    cy.getByTest('tablist')
      .should('have.attr', 'role', 'tablist')
      .and('have.attr', 'aria-labelledby', 'tabs-heading')

    // Check that the first tab is active
    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '10')

  })

  it('Navigation works correctly', () => {
    cy.mount(
      <TabsComponent 
        tabs={ tabsReference }
        withoutAnswerPhrases={ tabpanelReference1 }
        correctPhrases={ tabpanelReference2 }
        wrongPhrases={ tabpanelReference3 }
        scoreAll='34'
        scoreCorrect='2'
        scoreWrong='4'
        onCheckStatusChange={()=>{}}
        updatedTab='correct'
      />
    )

    //Select the second tab
    cy.get('button[role="tab"]:first-child').focus()
    cy.get('button[role="tab"]:nth-child(2)').focus()

    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '9')

    //Select the third tab
    cy.get('button[role="tab"]:nth-child(3)').focus()

    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '8')

    //Click the first tab
    cy.get('button[role="tab"]:nth-child(1)').click()

    cy.get('button[role="tab"]:nth-child(1)').should('be.focused')
    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '10')

    //Click the second tab
    cy.get('button[role="tab"]:nth-child(2)').click()

    cy.get('button[role="tab"]:nth-child(2)').should('be.focused')
    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '9')

    //Click the third tab
    cy.get('button[role="tab"]:nth-child(3)').click()

    cy.get('button[role="tab"]:nth-child(3)').should('be.focused')
    cy.get('[role="tabpanel"]').find('.cards-container').children().should('have.length', '8')
  })
})