import Tab from '../tab/Tab'
import TabList from '../tabList/TabList'
import TabPanel from '../tabPanel/TabPanel'
import TabsContainer from './TabsContainer'

describe('<TabsContainer />', () => {
  it('renders', () => {
    cy.mount(
      <TabsContainer>
        <TabList>
          <Tab id="1" isSelected={true}>Без ответа</Tab>
          <Tab id="2" isSelected={false}>Верно</Tab>
          <Tab id="3" isSelected={false}>Неверно</Tab>
        </TabList>
        <TabPanel id="1"><p>CONTENT TABPANEL 1</p></TabPanel>
        <TabPanel id="2"><p>CONTENT TABPANEL 2</p></TabPanel>
        <TabPanel id="3"><p>CONTENT TABPANEL 3</p></TabPanel>
      </TabsContainer>
    )
  })
})