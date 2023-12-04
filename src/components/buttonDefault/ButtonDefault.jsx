import PropTypes from 'prop-types';

export default function ButtonDefault({
  children,
  handleClick,
  test,
  disabled,
  checkStatus,
  hidden
}) {
  return (
    <button 
        onClick={handleClick}
        data-testid={test}
        disabled={disabled}
        className={checkStatus && checkStatus}
        hidden={hidden}
      >
        <span>{children}</span>
      </button>
  )
}

ButtonDefault.propTypes = {
  children: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checkStatus: PropTypes.string,
  hidden: PropTypes.bool
}