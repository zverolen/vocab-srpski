import Header from './Header'

describe('<Header />', () => {
  it('Renders correctly', () => {
    cy.mount(<Header />)
    cy.get('header').find('h1').should('have.text', 'Сербский вслух')
    cy.get('header').find('p').should('have.text', 'Тренируйтесь говорить по-сербски')
  })
})