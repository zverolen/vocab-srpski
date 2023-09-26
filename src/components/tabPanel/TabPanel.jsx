import PropTypes from 'prop-types'

export default function TabPanel({ children, id }) {
  return (
    <div 
      id={`tabpanel-${id}`}
      role="tabpanel"
      tabIndex="0"
      aria-labelledby={`tab-${id}`}
      data-testid="tabpanel"
      >
      { children }
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired
}