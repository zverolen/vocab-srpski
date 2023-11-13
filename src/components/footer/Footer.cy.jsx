import Footer from './Footer'

describe('<Footer />', () => {
  it('Renders correctly', () => {
    cy.mount(<Footer />)
    cy.get('footer')
      .should('have.css', 'border-top-width', '1px')
      .and('have.css', 'border-top-style', 'solid')
    cy.get('footer').find('h2').should('have.text', 'Обратная связь')
    cy.get('footer').find('p:first-of-type')
      .should('have.text', 'Если вы заметили ошибку, сообщите об этом на электронную почту fakeemail@fakeemailserver.com')
      .and('have.css', 'margin-bottom', '6px')
    cy.get('footer').find('p:first-of-type a')
      .should('have.text', 'fakeemail@fakeemailserver.com')
      .and('have.attr', 'href', 'mailto:fakeemail@fakeemailserver.com')
    cy.get('footer').find('p:last-of-type')
      .should('have.text', 'Ссылка на проект на Github: https://github.com/zverolen/vocab-srpski')
      .and('have.css', 'margin-bottom', '0px')
    cy.get('footer').find('p:last-of-type a')
      .should('have.text', 'https://github.com/zverolen/vocab-srpski')
      .and('have.attr', 'href', 'https://github.com/zverolen/vocab-srpski')
  })
})