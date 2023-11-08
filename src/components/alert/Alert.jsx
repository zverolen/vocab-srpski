import PropTypes from 'prop-types'

import { copy } from '../../data/copy'
// import { useState } from 'react'

export default function Alert({ phraseTab, isVisible }) {

  // const [isVisible, setIsVisible] = useState()

  let tab
  let alertClassName

  if (phraseTab === 'correct') {
    tab = copy.tabs.correct
    alertClassName = 'correct'
  } else if (phraseTab === 'wrong') {
    tab = copy.tabs.wrong
    alertClassName = 'wrong'
  } else if (phraseTab === 'unset') {
    tab = copy.tabs.withoutAnswer
    alertClassName = 'withoutAnswer'
  }

  return (
    <div role="alert" className={alertClassName} aria-live="polite">
      {isVisible && <p>Фраза отправлена в группу &quot;{tab}&quot;</p>}
    </div>
  )
}

Alert.propTypes = {
  phraseTab: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired
}