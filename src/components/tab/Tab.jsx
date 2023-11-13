// Implementation details:
// event.preventDefault() on click is used to keep the focus on tab when clicked
// IMPORTAINT: when focused by mouse, the :focus pseudo-class is needed; :focus-visible doesn't work 
import { useEffect, forwardRef, useRef } from 'react'

import PropTypes from 'prop-types'
import { copy } from '../../data/copy'

const Tab = forwardRef(({ id, isSelected, children, onSelect, onKeyboardNavigation, score, className }, ref) => {

  let oldScore = useRef(0)

  useEffect(() => {
    if(score > oldScore.current) {
      ref.current.classList.add('updated')
      setTimeout(() => {
        ref.current.classList.remove('updated')
      }, 1000)
    }
    oldScore.current = score
  }, [score])

  
  let emoji 

  if (id === '0') {
    emoji = copy.tabs.emojiWithoutAnswer
  } else if (id === '1') {
    emoji = copy.tabs.emojiCorrect
  } else {
    emoji = copy.tabs.emojiWrong
  }

  function handleKeyboardNavigation(event) {
    onKeyboardNavigation({id: id, key: event.key})
  }

  return (
    <button
      className={className}
      onFocus={()=>{onSelect(id)}}
      onKeyDown={(e) => {handleKeyboardNavigation(e)}}
      onClick={() => {onSelect(id)}}
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
        <span aria-hidden="true">{emoji}</span>
        <span>{ children }:&nbsp;</span>
        <span>{score}</span>
      </span>
    </button>
  )
})

Tab.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onKeyboardNavigation: PropTypes.func.isRequired,
  score: PropTypes.string.isRequired
}

export default Tab