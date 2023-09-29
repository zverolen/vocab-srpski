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
    const idNumber = Number(id)
    const tabsNumber = tabs.length

    switch(key) {
      case 'Home': 
        setSelectedTab('1')
        break
      case 'End':
        setSelectedTab(tabs.length.toString())
        break
      case 'ArrowRight':
        // while ((idNumber + 1) <= tabsNumber) {
        //   setSelectedTab((idNumber + 1).toString())
        // }
        console.log(idNumber)
        setSelectedTab((idNumber + 1).toString())
        break
      case 'ArrowLeft':
        // if (idNumber > 1) {
        //   setSelectedTab((idNumber - 1).toString())
        // }
        break
      default:
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