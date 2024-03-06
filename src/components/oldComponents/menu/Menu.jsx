import PropTypes from 'prop-types'
import styles from './menu.module.css'

export default function Menu({children}) {
  return (
    <>
      <h2 className="visually-hidden">Настройки отображения карточек</h2>
      <ul role="list" className={styles.menu}>
        {children}
      </ul>
    </>
  )
}

Menu.propTypes = {
  children: PropTypes.element
}