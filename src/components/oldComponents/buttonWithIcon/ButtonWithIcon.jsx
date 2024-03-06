import PropTypes from 'prop-types'

export default function ButtonWithIcon({icon, isDefault, handleClick, type, children, isExpanded}) {

  // const typeClassName = type ? `${type} ` : ''
  const hiddenStyle = isExpanded ? {display: "none"} : {}
  return (
      <button 
        className="withIcon" 
        data-testid="button-with-icon" 
        onClick={handleClick}
        aria-expanded={isExpanded}
      >
        {children}
      
        <span hidden={isExpanded}>
          <svg 
            width="18" 
            height="18"
            viewBox="0 0 18 18" 
            fill="none" 
            className="plus"
          > 
            <circle r="8" cx="9" cy="9" fill="transparent" strokeWidth="1.5" />
            <rect x="0" y="0" width="12" height="1.5" rx="1" ry="1" transform="translate(3 8)" />
            <rect x="0" y="0" width="12" height="1.5" rx="1" ry="1" transform="translate(9.5 3) rotate(90)" />
          </svg>
        </span>

        <span hidden={!isExpanded}>
          <svg 
            width="18" 
            height="18"
            viewBox="0 0 18 18" 
            fill="none" 
            className="minus"
          > 
            <circle r="8" cx="9" cy="9" fill="transparent" strokeWidth="1.5" />
            <rect x="0" y="0" width="12" height="1.5" rx="1" ry="1" transform="translate(3 8)" />
          </svg>
      </span>
        {!isDefault && icon} 
    </button>
  )
}

ButtonWithIcon.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDefault: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isExpanded: PropTypes.bool
}