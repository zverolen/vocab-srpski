import TabPanel from '../tabPanel/TabPanel'
import TabsContainer from './TabsContainer'

const tabsReference = [
  { id: '1', caption: 'Без ответа' },
  { id: '2', caption: 'Верно' },
  { id: '3', caption: 'Неверно' }
]

const tabpanelReference = [
  {id: '1', tempContent: 'CONTENT TABPANEL 1'},
  {id: '2', tempContent: 'CONTENT TABPANEL 2'},
  {id: '3', tempContent: 'CONTENT TABPANEL 3'}
]

describe('<TabsContainer />', () => {
  it('Renders correctly with the first tab active', () => {
    cy.mount(
      <TabsContainer tabs={ tabsReference } tabpanels={ tabpanelReference } />
    )

    // --> Check that the first tab is active
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 1')

    //Select the second tab
    cy.get('button:first-child').focus()
    cy.get('button:nth-child(2)').focus()

    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 2')
  })
})