import Tab from './Tab'

describe('<Tab />', () => {
  it('Selected tab is rendered correctly', () => {
    cy.mount(<Tab id="1"isSelected={true}>Без ответа</Tab>)
    cy.get('button')
      .should('have.text', 'Без ответа')
      .and('have.attr', 'id', 'tab-1')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'aria-controls', 'tabpanel-1')
      .and('have.attr', 'tabindex', '0')
  })

  it('Not selected tab is rendered correctly', () => {
    cy.mount(<Tab id="2" isSelected={false}>Верно</Tab>)
    cy.get('button')
      .should('have.text', 'Верно')
      .and('have.attr', 'id', 'tab-2')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'aria-controls', 'tabpanel-2')
      .and('have.attr', 'tabindex', '-1')
  })
})