import PropTypes from 'prop-types';
import styles from './buttonDefault.module.css'

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
        className={`${checkStatus} ${styles.default}`}
        hidden={hidden}
      >
        {children}   
      </button>
  )
}

ButtonDefault.propTypes = {
  children: PropTypes.element.isRequired,
  handleClick: PropTypes.func.isRequired,
  test: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checkStatus: PropTypes.string,
  hidden: PropTypes.bool
}