import PropTypes from 'prop-types'

import { useState } from "react"
// import ButtonWithIcon from '../buttonWithIcon/ButtonWithIcon';
import ButtonWithIcon2 from '../buttonWithIcon2/ButtonWithIcon2';

export default function Disclosure({ children, captionWhenCollapsed, captionWhenExpanded  }) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="disclosure" data-testid="disclosure" aria-live="polite">
     <h2>
      {/* <ButtonWithIcon 
        isOpen={isExpanded} 
        handleClick={handleExpand} 
        isDefault={isDefault} 
        captionWhenCollapsed={captionWhenCollapsed} 
        captionWhenExpanded={captionWhenExpanded}
      /> */}
      <ButtonWithIcon2 handleClick={handleExpand} isExpanded={isExpanded}>
        {isExpanded ? captionWhenExpanded || captionWhenCollapsed : captionWhenCollapsed}
      </ButtonWithIcon2>
     </h2>
      {isExpanded && children}
    </div>
  )
}

Disclosure.propTypes = {
  children: PropTypes.element,
  isDefault: PropTypes.bool,
  captionWhenCollapsed: PropTypes.string.isRequired,
  captionWhenExpanded: PropTypes.string
}