// Implementation details:
// Using a keyboard and a mouse in the tabs component moves the focus to corresponding tabs.
// The state changes depending on which element receives focus and not which element was activated
// This was done because there are two types of events that activate tabs, but it's intended
// that the state is changed in one place.
// Focus-dependent behavior also facilitates compatibility with keyboard navigation and 
// using screen readers.

import PropTypes from 'prop-types'

import { useRef, useState } from "react"
import Tab from '../tab/Tab'
import TabPanel from '../tabPanel/TabPanel'

const tabsReference = [
  { id: '0', caption: 'Без ответа' },
  { id: '1', caption: 'Верно' },
  { id: '2', caption: 'Неверно' }
]

export default function TabsComponent({ tabs, tabpanels }) {
  const [ selectedTab, setSelectedTab ] = useState('0')
  const selectedTabpanel = tabpanels.find(tabpanel => tabpanel.id === selectedTab)
  const tab1 = useRef(null)
  const tab2 = useRef(null)
  const tab3 = useRef(null)

  function handleSelect(id) {
    setSelectedTab(id)
  }

  function handleTabSelection({id, key}) {
    const idNumber = Number(id)
    const tabLast = tabsReference.length - 1
    const refList = [ tab1, tab2, tab3]

    switch(key) {
      case 'Home': 
        // setSelectedTab('0')
        refList[0].current.focus()
        break
      case 'End':
        // setSelectedTab((tabs.length - 1).toString())
        refList[refList.length - 1].current.focus()
        break
      case 'ArrowRight':
        if (idNumber < tabLast) {
          // setSelectedTab((idNumber + 1).toString())
          refList[idNumber + 1].current.focus()
        }
        break
      case 'ArrowLeft':
        if (idNumber > 0) {
          // setSelectedTab((idNumber - 1).toString())
          refList[idNumber - 1].current.focus()
        }
        break
      default:
        break
    }
  }
  
  return (
    <div>
      <h2 className="visually-hidden" id="tabs-heading">Фразы на сербском</h2>
      <div role="tablist" data-testid="tablist" aria-labelledby="tabs-heading">
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

TabsComponent.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabpanels: PropTypes.array.isRequired
}