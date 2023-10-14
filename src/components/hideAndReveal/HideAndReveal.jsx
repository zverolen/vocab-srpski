import PropTypes from 'prop-types'

import { useState } from "react"
import ButtonWithIcon from '../buttonWithIcon/ButtonWithIcon';

export default function HideAndReveal({ children, isDefault, captionWhenCollapsed, captionWhenExpanded  }) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div data-testid="hide-and-reveal" aria-live="polite">
      <ButtonWithIcon 
        isOpen={isExpanded} 
        handleClick={handleExpand} 
        isDefault={isDefault} 
        captionWhenCollapsed={captionWhenCollapsed} 
        captionWhenExpanded={captionWhenExpanded}
      />
      {isExpanded && children}
    </div>
  )
}

HideAndReveal.propTypes = {
  children: PropTypes.element,
  isDefault: PropTypes.bool.isRequired,
  captionWhenCollapsed: PropTypes.string.isRequired,
  captionWhenExpanded: PropTypes.string
}