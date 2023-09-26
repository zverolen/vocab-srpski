import TabList from './TabList'

describe('<TabList />', () => {
  it('Renders correctly', () => {
    cy.mount(<TabList><p>Content of the tab list</p></TabList>)
    cy.getByTest('tablist').find('p').should('have.text', 'Content of the tab list')
    cy.getByTest('tablist').should('have.attr', 'role', 'tablist')
  })
})