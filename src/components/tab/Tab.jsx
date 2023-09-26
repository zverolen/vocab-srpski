import PropTypes from 'prop-types'
import styles from './tab.module.css'

export default function Tab({ id, isSelected, children }) {
  return (
    <button
      id={`tab-${id}`}
      role='tab'
      aria-selected={isSelected}
      aria-controls={`tabpanel-${id}`}
      type='button'
      tabIndex={isSelected ? '0' : '-1' }
      className={styles.tab}
      >
      <span>{ children }</span>
    </button>
  )
}

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  isSelected: PropTypes.bool.isRequired
}