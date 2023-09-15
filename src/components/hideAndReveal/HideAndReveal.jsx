import PropTypes from 'prop-types'

import { useState } from "react"
import ButtonWithIcon from '../buttonWithIcon/ButtonWithIcon';

export default function HideAndReveal({children}) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div data-testid="hide-and-reveal" aria-live="polite">
      <ButtonWithIcon isOpen={isExpanded} handleClick={handleExpand} />
      {isExpanded && children}
    </div>
  )
}

HideAndReveal.propTypes = {
  children: PropTypes.element
}