import PropTypes from 'prop-types'
import styles from './tab.module.css'
import { forwardRef } from 'react'

const Tab = forwardRef(({ id, isSelected, children, onSelect, onNavigation }, ref) => {

  function handleKeyboardNavigation(event) {
    onNavigation({id: id, key: event.key})
  }

  return (
    <button
      // onFocus={()=>{onSelect(id)}}
      onKeyDown={(e) => {handleKeyboardNavigation(e)}}
      id={`tab-${id}`}
      role='tab'
      aria-selected={isSelected}
      aria-controls={`tabpanel-${id}`}
      type='button'
      tabIndex={isSelected ? '0' : '-1' }
      className={styles.tab}
      key={id}
      ref={ref}
      >
      <span>{ children }</span>
    </button>
  )
})

export default Tab
// ({ id, isSelected, children, onSelect, onNavigation }) {
//   function handleKeyboardNavigation(event) {
//     onNavigation({id: id, key: event.key})
//   }
//   return (
//     <button
//       // onFocus={()=>{onSelect(id)}}
//       onKeyDown={(e) => {handleKeyboardNavigation(e)}}
//       id={`tab-${id}`}
//       role='tab'
//       aria-selected={isSelected}
//       aria-controls={`tabpanel-${id}`}
//       type='button'
//       tabIndex={isSelected ? '0' : '-1' }
//       className={styles.tab}
//       key={id}
//       >
//       <span>{ children }</span>
//     </button>
//   )
// }

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onNavigation: PropTypes.func.isRequired
}