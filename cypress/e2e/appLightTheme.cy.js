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

describe('The basic user flow, click-based but with focus', () => {
  it('Everything looks and works as expected', () => {
    cy.visit('/')
    
    // Check out the site headings
    cy.get('header').should('have.text', 'Сербский вслухТренируйтесь говорить по-сербски')

    //Check out the instruction
    cy.getByTest('button-with-icon').should('have.text', 'Инструкция')
    cy.getByTest('disclosure').children().should('have.length', '2')
    cy.getByTest('button-with-icon').focus()
    cy.getByTest('button-with-icon')
      .should('have.css', 'outline-color', color_reference.white)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)

    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').children().should('have.length', '3')
    cy.get('.instruction').children()
      .should('have.length', '6')
      .and('have.text', 'Выберите фразу и переведите её с русского языка на сербскийНажмите "Показать ответ", чтобы проверить себяЕсли вы перевели правильно, нажмите "Знаю", если неправильно, нажмите "Учу"Фразы с отметкой "Знаю" перемещаются во вкладку "Знаю", с отметкой "Учу" перемещаются во вкладку "Учу". Во кладке "Без ответа" находятся фразы, с которыми вы ещё не поработалиРядом с названием вкладок отображается количество фраз с соответствующей отметкойЧтобы поработать с карточкой ещё раз, нажмите "Скрыть ответ" или "Сбросить"')
    
    cy.getByTest('button-with-icon').should('be.focused')
    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').children().should('have.length', '2')

    //Check out the tabs
    //NOTE: The normal have.text test doesn't pass because of the usage of &nbsp; in the component.
    //That is why the query is used instead to check that the text is present
    //NOTE: The first score is not checked because new phrases may be added and it can change
    cy.get('[role="tablist"]').find('button:first-child').find('[data-testid="tab-caption"]').contains('Без ответа:')
    cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-caption"]').contains('Знаю:')
    cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('0')
    cy.get('[role="tablist"]').find('button:nth-child(3)').find('[data-testid="tab-caption"]').contains('Учу:')
    cy.get('[role="tablist"]').find('button:nth-child(3)').find('[data-testid="tab-score"]').contains('0')

    cy.get('[role="tablist"]').find('button:nth-child(2)').focus()
    //Green border
    cy.get('[role="tablist"]').find('button:nth-child(2)').should('have.css', 'border-color', color_reference.greenLightTheme)
    //Green inner border and color
    cy.get('[role="tablist"]').find('button:nth-child(2)').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.greenLightTheme} 0px 0px 0px 5px`)
      .and('have.css', 'color', color_reference.greenLightTheme)
    //Green tabpanel border and text
    cy.get('[role="tabpanel"]')
      .should('have.css', 'border-color', color_reference.greenLightTheme)
      .and('have.text', 'Здесь появятся фразы, которые вы знаете')

    cy.get('[role="tablist"]').find('button:nth-child(3)').focus()
    //Red border
    cy.get('[role="tablist"]').find('button:nth-child(3)').should('have.css', 'border-color', color_reference.redLightTheme)
    //Red inner border and color
    cy.get('[role="tablist"]').find('button:nth-child(3)').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.redLightTheme} 0px 0px 0px 5px`)
      .and('have.css', 'color', color_reference.redLightTheme)
    //Red tabpanel border and text
    cy.get('[role="tabpanel"]')
      .should('have.css', 'border-color', color_reference.redLightTheme)
      .and('have.text', 'Здесь появятся фразы, над которыми стоит ещё поработать')

    cy.get('[role="tablist"]').find('button:nth-child(1)').focus()
    //Black border
    cy.get('[role="tablist"]').find('button:nth-child(1)').should('have.css', 'border-color', color_reference.black)
    //Black inner border and color
    cy.get('[role="tablist"]').find('button:nth-child(1)').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 5px`)
      .and('have.css', 'color', color_reference.black)
    //Black tabpanel border
    cy.get('[role="tabpanel"]')
      .should('have.css', 'border-color', color_reference.black)

    //Work with phrases

    //Give correct answer to the first card
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child')
      .should('have.text', 'Это твоя книга?')
      .and('be.visible')
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:last-child').should('not.be.visible')
    cy.get('.card:first-child').find('[data-testid="button-answer"]')
    cy.get('.card:first-child').find('[data-testid="button-correct"]').should('be.disabled')
    cy.get('.card:first-child').find('[data-testid="button-wrong"]').should('be.disabled')

    // Seeing the answer
    cy.get('.card:first-child').find('[data-testid="button-answer"]').focus()
    cy.get('.card:first-child').find('[data-testid="button-answer"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
    
    cy.get('.card:first-child').find('[data-testid="button-answer"]').click()
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child').should('not.be.visible')
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:last-child')
      .should('be.visible')
      .and('have.text', 'Da li je ovo tvoja knjiga?')
    cy.get('.card:first-child').find('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('.card:first-child').find('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('.card:first-child').find('[data-testid="button-wrong"]').should('not.be.disabled')

    //Giving the correct answer
    cy.get('.card:first-child').find('[data-testid="button-correct"]').focus()
    cy.get('.card:first-child').find('[data-testid="button-correct"]')
      .should('have.css', 'box-shadow', `${color_reference.greenLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.greenLightTheme)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:first-child').find('[data-testid="button-correct"]').click()
    
    // Alert
    cy.wait(1500)
    cy.get('[role="alert"]').should('be.visible') 
    cy.wait(3500)
    cy.get('[role="alert"]').should('not.be.visible')

    //Correct tab
    cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('1')

    //New first card
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child').should('have.text', 'Это не его часы.')

    //Give wrong answer to the first card
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child')
      .should('have.text', 'Это не его часы.')
      .and('be.visible')
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:last-child').should('not.be.visible')
    cy.get('.card:first-child').find('[data-testid="button-answer"]')
    cy.get('.card:first-child').find('[data-testid="button-correct"]').should('be.disabled')
    cy.get('.card:first-child').find('[data-testid="button-wrong"]').should('be.disabled')

    // Seeing the answer
    cy.get('.card:first-child').find('[data-testid="button-answer"]').focus()
    cy.get('.card:first-child').find('[data-testid="button-answer"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
    
    cy.get('.card:first-child').find('[data-testid="button-answer"]').click()
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child').should('not.be.visible')
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:last-child')
      .should('be.visible')
      .and('have.text', 'To nije njegov sat.')
    cy.get('.card:first-child').find('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('.card:first-child').find('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('.card:first-child').find('[data-testid="button-wrong"]').should('not.be.disabled')

    //Giving the wrong answer
    cy.get('.card:first-child').find('[data-testid="button-wrong"]').focus()
    cy.get('.card:first-child').find('[data-testid="button-wrong"]')
      .should('have.css', 'box-shadow', `${color_reference.redLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.redLightTheme)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:first-child').find('[data-testid="button-wrong"]').click()
    
    // Alert
    cy.wait(1500)
    cy.get('[role="alert"]').should('be.visible')
    cy.wait(3500)
    cy.get('[role="alert"]').should('not.be.visible')

    //Correct tab
    cy.get('[role="tablist"]').find('button:nth-child(3)').find('[data-testid="tab-score"]').contains('1')

    //New first card
    cy.get('.card:first-child').find('[data-testid="text-phrase"] > p:first-child').should('have.text', 'Это мой ребёнок.')

    //Give correct answer to the 5th card
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:first-child')
      .should('have.text', 'Кем работает твоя сестра?')
      .and('be.visible')
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:last-child').should('not.be.visible')
    cy.get('.card:nth-child(5)').find('[data-testid="button-answer"]')
    cy.get('.card:nth-child(5)').find('[data-testid="button-correct"]').should('be.disabled')
    cy.get('.card:nth-child(5)').find('[data-testid="button-wrong"]').should('be.disabled')

    // Seeing the answer
    cy.get('.card:nth-child(5)').find('[data-testid="button-answer"]').focus()
    cy.get('.card:nth-child(5)').find('[data-testid="button-answer"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
    
    cy.get('.card:nth-child(5)').find('[data-testid="button-answer"]').click()
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:first-child').should('not.be.visible')
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:last-child')
      .should('be.visible')
      .and('have.text', 'Šta je tvoja sestra?')
    cy.get('.card:nth-child(5)').find('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('.card:nth-child(5)').find('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('.card:nth-child(5)').find('[data-testid="button-wrong"]').should('not.be.disabled')

    //Giving the correct answer
    cy.get('.card:nth-child(5)').find('[data-testid="button-correct"]').focus()
    cy.get('.card:nth-child(5)').find('[data-testid="button-correct"]')
      .should('have.css', 'box-shadow', `${color_reference.greenLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.greenLightTheme)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(5)').find('[data-testid="button-correct"]').click()
    
    // Alert
    cy.wait(1500)
    cy.get('[role="alert"]').should('be.visible') 
    cy.wait(3500)
    cy.get('[role="alert"]').should('not.be.visible')

    //Correct tab
    cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('2')

    //New first card
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:first-child').should('have.text', 'Это её подруга.')

    //Give wrong answer to the 3d card
    cy.get('.card:nth-child(3)').find('[data-testid="text-phrase"] > p:first-child')
      .should('have.text', 'Это его дом.')
      .and('be.visible')
    cy.get('.card:nth-child(3)').find('[data-testid="text-phrase"] > p:last-child').should('not.be.visible')
    cy.get('.card:nth-child(3)').find('[data-testid="button-answer"]')
    cy.get('.card:nth-child(3)').find('[data-testid="button-correct"]').should('be.disabled')
    cy.get('.card:nth-child(3)').find('[data-testid="button-wrong"]').should('be.disabled')

    // Seeing the answer
    cy.get('.card:nth-child(3)').find('[data-testid="button-answer"]').focus()
    cy.get('.card:nth-child(3)').find('[data-testid="button-answer"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)
    
    cy.get('.card:nth-child(3)').find('[data-testid="button-answer"]').click()
    cy.get('.card:nth-child(3)').find('[data-testid="text-phrase"] > p:first-child').should('not.be.visible')
    cy.get('.card:nth-child(3)').find('[data-testid="text-phrase"] > p:last-child')
      .should('be.visible')
      .and('have.text', 'To je njegova kuća.')
    cy.get('.card:nth-child(3)').find('[data-testid="button-answer"]').should('have.text', 'Скрыть ответ')
    cy.get('.card:nth-child(3)').find('[data-testid="button-correct"]').should('not.be.disabled')
    cy.get('.card:nth-child(3)').find('[data-testid="button-wrong"]').should('not.be.disabled')

    //Giving the wrong answer
    cy.get('.card:nth-child(3)').find('[data-testid="button-wrong"]').focus()
    cy.get('.card:nth-child(3)').find('[data-testid="button-wrong"]')
      .should('have.css', 'box-shadow', `${color_reference.redLightTheme} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.redLightTheme)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(3)').find('[data-testid="button-wrong"]').click()
    
    // Alert
    cy.wait(1500)
    cy.get('[role="alert"]').should('be.visible')
    cy.wait(3500)
    cy.get('[role="alert"]').should('not.be.visible')

    //Correct tab
    cy.get('[role="tablist"]').find('button:nth-child(3)').find('[data-testid="tab-score"]').contains('2')

    //New first card
    cy.get('.card:nth-child(3)').find('[data-testid="text-phrase"] > p:first-child').should('have.text', 'Это мой хороший друг.')

    // Open the tab with correct answers and work with cards
    cy.get('[role="tablist"]').find('button:nth-child(2)').focus()
    cy.get('.cards-container').children().should('have.length', '5')
    cy.get('.card:nth-child(1)').should('have.css', 'border-color', color_reference.greenLightTheme)
    cy.get('.card:nth-child(1)').find('[data-testid="text-phrase"] > p:nth-child(2)')
      .should('have.text', 'Da li je ovo tvoja knjiga?')
      .and('be.visible')
    cy.get('.card:nth-child(2)').should('have.css', 'border-color', color_reference.greenLightTheme)
    cy.get('.card:nth-child(2)').find('[data-testid="text-phrase"] > p:nth-child(2)')
      .should('have.text', 'Šta je tvoja sestra?')
      .and('be.visible')

    //Reset the first card
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').focus()
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').click()

     // Alert
     cy.wait(1500)
     cy.get('[role="alert"]').should('be.visible')
     cy.wait(3500)
     cy.get('[role="alert"]').should('not.be.visible')
 
     cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('1')
 
     //New first card
     cy.get('.card:nth-child(1)').find('[data-testid="text-phrase"] > p:nth-child(2)').should('have.text', 'Šta je tvoja sestra?')

     //Reset the new first card
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').focus()
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').click()

     // Alert
     cy.wait(1500)
     cy.get('[role="alert"]').should('be.visible')
     cy.wait(3500)
     cy.get('[role="alert"]').should('not.be.visible')
 
     cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('0')
 
     //Empty tabpanel text
     cy.get('[role="tabpanel"]').should('have.text', 'Здесь появятся фразы, которые вы знаете')

     // Open the tab with wrong answers and work with cards
    cy.get('[role="tablist"]').find('button:nth-child(3)').focus()
    cy.get('.cards-container').children().should('have.length', '5')
    cy.get('.card:nth-child(1)').should('have.css', 'border-color', color_reference.redLightTheme)
    cy.get('.card:nth-child(1)').find('[data-testid="text-phrase"] > p:nth-child(2)')
      .should('have.text', 'To nije njegov sat.')
      .and('be.visible')
    cy.get('.card:nth-child(2)').should('have.css', 'border-color', color_reference.redLightTheme)
    cy.get('.card:nth-child(2)').find('[data-testid="text-phrase"] > p:nth-child(2)')
      .should('have.text', 'To je njegova kuća.')
      .and('be.visible')

    //Reset the first card
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').focus()
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').click()

     // Alert
     cy.wait(1500)
     cy.get('[role="alert"]').should('be.visible')
     cy.wait(3500)
     cy.get('[role="alert"]').should('not.be.visible')
 
     cy.get('[role="tablist"]').find('button:nth-child(3)').find('[data-testid="tab-score"]').contains('1')
 
     //New first card
     cy.get('.card:nth-child(1)').find('[data-testid="text-phrase"] > p:nth-child(2)').should('have.text', 'To je njegova kuća.')

     //Reset the new first card
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').focus()
    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]')
      .should('have.css', 'outline', `${color_reference.white} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'color', color_reference.white)

    cy.get('.card:nth-child(1)').find('[data-testid="button-reset"]').click()

     // Alert
     cy.wait(1500)
     cy.get('[role="alert"]').should('be.visible')
     cy.wait(3500)
     cy.get('[role="alert"]').should('not.be.visible')
 
     cy.get('[role="tablist"]').find('button:nth-child(2)').find('[data-testid="tab-score"]').contains('0')
 
     //Empty tabpanel text
     cy.get('[role="tabpanel"]').should('have.text', 'Здесь появятся фразы, над которыми стоит ещё поработать')

     // Check the all phrases tab
     cy.get('[role="tablist"]').find('button:nth-child(1)').focus()

     cy.get('.card:nth-child(1)').find('[data-testid="text-phrase"] > p:nth-child(1)')
      .should('have.text', 'Это твоя книга?')
      .and('be.visible')
    cy.get('.card:nth-child(2)').find('[data-testid="text-phrase"] > p:nth-child(1)')
      .should('have.text', 'Это не его часы.')
      .and('be.visible')
    cy.get('.card:nth-child(5)').find('[data-testid="text-phrase"] > p:nth-child(1)')
      .should('have.text', 'Это его дом.')
      .and('be.visible')
    cy.get('.card:nth-child(7)').find('[data-testid="text-phrase"] > p:nth-child(1)')
      .should('have.text', 'Кем работает твоя сестра?')
      .and('be.visible')

     //Checking out the footer
     cy.get('footer').find('h2').should('have.text', 'Обратная связь')
     cy.get('footer').find('p:nth-of-type(1)').should('have.text', 'Если вы заметили ошибку, сообщите об этом на электронную почту fakeemail@fakeemailserver.com')
     cy.get('footer').find('p:nth-of-type(2)').should('have.text', 'Ссылка на проект на Github: https://github.com/zverolen/vocab-srpski')
     
     cy.get('footer').find('p:nth-of-type(1)').find('a').focus()
     cy.get('footer').find('p:nth-of-type(1)').find('a')
     .should('have.css', 'outline-color', color_reference.white)
     .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)

     cy.get('footer').find('p:nth-of-type(2)').find('a').focus()
     cy.get('footer').find('p:nth-of-type(2)').find('a')
     .should('have.css', 'outline-color', color_reference.white)
     .and('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 8px`)
  })

  // it('Screen readers compatibility check', () => {
  //   cy.visit('/')
  // })
})