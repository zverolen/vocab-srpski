import TabPanel from './TabPanel'

describe('<TabPanel />', () => {
  it('renders', () => {
    cy.mount(
      <TabPanel id="1">
        <p>Content of the tab panel 1</p>
      </TabPanel>
    )
    cy.getByTest('tabpanel')
      .should('have.text', 'Content of the tab panel 1')
      .and('have.attr', 'id', 'tabpanel-1')
      .and('have.attr', 'role', 'tabpanel')
      .and('have.attr', 'tabindex', '0')
      .and('have.attr', 'aria-labelledby', 'tab-1')
  })
})