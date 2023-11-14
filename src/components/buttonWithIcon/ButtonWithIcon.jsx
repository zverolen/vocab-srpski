import PropTypes from 'prop-types'

export default function ButtonWithIcon({icon, isDefault, handleClick, type, children, isExpanded}) {

  const typeClassName = type ? `${type} ` : ''
  return (
      <button 
        className={`${typeClassName}withIcon`} 
        data-testid="button-with-icon" 
        onClick={handleClick}
        aria-expanded={isExpanded}
      >
      <span>
        {children}
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