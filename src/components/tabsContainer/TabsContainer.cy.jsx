import TabPanel from '../tabPanel/TabPanel'
import TabsContainer from './TabsContainer'

const tabsReference = [
  { id: '1', caption: 'Без ответа' },
  { id: '2', caption: 'Верно' },
  { id: '3', caption: 'Неверно' }
]

describe('<TabsContainer />', () => {
  it('Renders correctly with the first tab active', () => {
    cy.mount(
      <TabsContainer tabs={ tabsReference }>
        <TabPanel id="1"><p>CONTENT TABPANEL 1</p></TabPanel>
        <TabPanel id="2"><p>CONTENT TABPANEL 2</p></TabPanel>
        <TabPanel id="3"><p>CONTENT TABPANEL 3</p></TabPanel>
      </TabsContainer>
    )

    // --> Check that the first tab is active
    cy.getByTest('tabpanel').should('have.text', 'CONTENT TABPANEL 1')
  })
})