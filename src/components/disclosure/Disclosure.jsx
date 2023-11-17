import PropTypes from 'prop-types'

import { useState } from 'react'
// import ButtonWithIcon from '../buttonWithIcon/ButtonWithIcon';
import ButtonWithIcon from '../buttonWithIcon/ButtonWithIcon';
import { copy } from '../../data/copy';

export default function Disclosure({ children, captionWhenCollapsed, captionWhenExpanded  }) {
  const [ isExpanded, setIsExpanded ] = useState(false);

  function handleExpand() {
    setIsExpanded(!isExpanded);
  }

  return (
    <div className="disclosure" data-testid="disclosure" aria-live="polite">
     <h2 className='visually-hidden'>{copy.instruction.heading}</h2>
      <ButtonWithIcon handleClick={handleExpand} isExpanded={isExpanded}>
        {isExpanded ? captionWhenExpanded || captionWhenCollapsed : captionWhenCollapsed}
      </ButtonWithIcon>
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