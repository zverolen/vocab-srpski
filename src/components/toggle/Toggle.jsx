import PropTypes from 'prop-types';
import styles from './toggle.module.css'

export default function Toggle({
  isOn
}) {
  return (
    <div aria-hidden="true" className={`${styles.container} ${isOn ? styles.on : 'off'}`} data-testid="toggle">
      <div>
        <div className={styles.dragControl}>
          <svg aria-hidden="true" width="10" height="18" viewBox="0 0 10 18" >
            <path d="M1 0L1 18M5 0L5 18M9 0L9 18" />
          </svg>
        </div>
        <span className={styles.caption}>{isOn ? 'Вкл' : 'Выкл'}</span>
      </div>
    </div>
  )
}

Toggle.propTypes = {
  isOn: PropTypes.bool.isRequired
}