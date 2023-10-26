// Implementation details:
// event.preventDefault() on click is used to keep the focus on tab when clicked
// IMPORTAINT: when focused by mouse, the :focus pseudo-class is needed; :focus-visible doesn't work 

import PropTypes from 'prop-types'
import { copy } from '../../data/copy'
import { forwardRef } from 'react'

const Tab = forwardRef(({ id, isSelected, children, onSelect, onNavigation, score }, ref) => {

  let emoji 

  if (id === '0') {
    emoji = copy.tabs.emojiWithoutAnswer
  } else if (id === '1') {
    emoji = copy.tabs.emojiCorrect
  } else {
    emoji = copy.tabs.emojiWrong
  }

  function handleKeyboardNavigation(event) {
    onNavigation({id: id, key: event.key})
  }

  return (
    <button
      onFocus={()=>{onSelect(id)}}
      onKeyDown={(e) => {handleKeyboardNavigation(e)}}
      onClick={(e) => {e.preventDefault()}}
      id={`tab-${id}`}
      role='tab'
      aria-selected={isSelected}
      aria-controls={`tabpanel-${id}`}
      type='button'
      tabIndex={isSelected ? '0' : '-1' }
      key={id}
      ref={ref}
      >
      <span>
        <span>{ emoji }</span><span>{ children }:&nbsp;</span><span>{score}</span>
      </span>
    </button>
  )
})

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onNavigation: PropTypes.func.isRequired,
  score: PropTypes.string
}

export default Tab