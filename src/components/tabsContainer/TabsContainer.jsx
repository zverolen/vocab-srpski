import PropTypes from 'prop-types'

import { useRef, useState } from "react"
import Tab from '../tab/Tab'
import TabPanel from '../tabPanel/TabPanel'

const tabsReference = [
  { id: '1', caption: 'Без ответа' },
  { id: '2', caption: 'Верно' },
  { id: '3', caption: 'Неверно' }
]

export default function TabsContainer({ tabs, tabpanels }) {
  const [ selectedTab, setSelectedTab ] = useState('1')
  const selectedTabpanel = tabpanels.find(tabpanel => tabpanel.id === selectedTab)
  const tab1 = useRef(null)
  const tab2 = useRef(null)
  const tab3 = useRef(null)

  function handleSelect(id) {
    setSelectedTab(id)
  }

  function handleTabSelection({id, key}) {
    const idNumber = Number(id)
    const tabsNumber = tabsReference.length

    switch(key) {
      case 'Home': 
        setSelectedTab('1')
        tab1.current.focus()
        break
      case 'End':
        setSelectedTab(tabs.length.toString())
        tab3.current.focus()
        break
      case 'ArrowRight':
        
        console.log(idNumber)
        setSelectedTab((idNumber + 1).toString())
        break
      case 'ArrowLeft':
       
        break
      default:
        break
    }
  }
  
  return (
    <div>
      <div role="tablist" data-testid="tablist">
        <Tab 
          id={ tabsReference[0].id } 
          isSelected={ tabsReference[0].id === selectedTab } 
          onNavigation={ handleTabSelection } 
          onSelect={ handleSelect }
          ref={ tab1 }
        >
          { tabsReference[0].caption }
        </Tab>
        <Tab 
          id={ tabsReference[1].id } 
          isSelected={ tabsReference[1].id === selectedTab } 
          onNavigation={handleTabSelection} 
          onSelect={ handleSelect }
          ref={ tab2 }
        >
          { tabsReference[1].caption }
        </Tab>
        <Tab 
          id={ tabsReference[2].id } 
          isSelected={ tabsReference[2].id === selectedTab } 
          onNavigation={handleTabSelection} 
          onSelect={ handleSelect }
          ref={ tab3 }
        >
          { tabsReference[2].caption }
        </Tab>
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