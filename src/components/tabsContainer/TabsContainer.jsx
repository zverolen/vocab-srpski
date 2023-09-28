import PropTypes from 'prop-types'

import { useState } from "react"
import Tab from '../tab/Tab'
import TabPanel from '../tabPanel/TabPanel'

export default function TabsContainer({ tabs, tabpanels }) {
  const [ selectedTab, setSelectedTab ] = useState('1')
  const selectedTabpanel = tabpanels.find(tabpanel => tabpanel.id === selectedTab)

  function handleSelect(id) {
    setSelectedTab(id)
  }

  function handleTabSelection({id, key}) {
    switch(key) {
      case 'Home': 
        setSelectedTab('1')
        break
      case 'End':
        setSelectedTab(tabs.length - 1)
        break
    }
  }

  
  return (
    <div>
      <div role="tablist" data-testid="tablist">
        {tabs.map(tab => <Tab key={ tab.id } id={ tab.id } isSelected={ tab.id === selectedTab } onNavigation={handleTabSelection} onSelect={ handleSelect }>{ tab.caption }</Tab>)}
      </div>
      <TabPanel id={selectedTabpanel.id}>
        {selectedTabpanel.tempContent}
      </TabPanel>
    </div>
  )
}

TabsContainer.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabpanels: PropTypes.array.isRequired
}