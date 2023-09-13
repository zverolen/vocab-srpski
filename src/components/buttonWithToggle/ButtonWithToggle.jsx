import PropTypes from 'prop-types';

import Toggle from "../toggle/Toggle"
import styles from './buttonWithToggle.module.css'

export default function ButtonWithToggle({
  ariaDescribedby,
  isOn = false,
  onToggle
}) {
  function handleClick() {
    onToggle()
  }
  
  return ( 
    <button className={styles.toggle} type="button" aria-pressed={isOn} onClick={handleClick} aria-describedby={ariaDescribedby}>
      Автоматическая сортировка карточек 
      <span data-testid="buttonToggle-status" className="visually-hidden">
        {isOn ? 'Включено': 'Выключено'}
      </span>
      <Toggle isOn={isOn}/>
    </button>
  )
}

ButtonWithToggle.propTypes = {
  ariaDescribedby: PropTypes.string,
  isOn: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
}