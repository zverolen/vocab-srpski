import PropTypes from 'prop-types'

export default function ButtonWithIcon2({icon, isDefault, handleClick, type, children, isExpanded}) {
  return (
      <button 
        className={`${type && type} withIcon`} 
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

ButtonWithIcon2.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDefault: PropTypes.bool,
  type: PropTypes.string,
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isExpanded: PropTypes.bool
}