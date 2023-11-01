import TabPanel from './TabPanel'

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