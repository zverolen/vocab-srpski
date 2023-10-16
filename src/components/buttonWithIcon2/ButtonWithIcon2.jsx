import PropTypes from 'prop-types'

export default function ButtonWithIcon2({icon, isDefault, handleClick, type, children}) {
  return (
      <button className={`${type} withIcon`} data-testid="button-with-icon" onClick={handleClick}>
      <span>
        {children}
      </span>
        {!isDefault && icon} 
    </button>
  )
}

ButtonWithIcon2.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isDefault: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  icon: PropTypes.string
}