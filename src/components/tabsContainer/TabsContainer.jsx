import PropTypes from 'prop-types'

import { useState } from "react"
import TabList from '../tabList/TabList'
import Tab from '../tab/Tab'

export default function TabsContainer({ tabs, tabpanels, children }) {
  const [ selectedTab, setSelectedTab ] = useState('1')
  
  return (
    <div>
      <div role="tablist" data-testid="tablist">
        {tabs.map(tab => <Tab key={tab.id} id={ tab.id } isSelected={tab.id === selectedTab}>{ tab.caption }</Tab>)}
      </div>
      { children }
    </div>
  )
}

TabsContainer.propTypes = {
  tabs: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
  tabpanels: PropTypes.array.isRequired
}