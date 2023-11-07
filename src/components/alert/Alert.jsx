import PropTypes from 'prop-types'

import { useState } from 'react'
import { copy } from '../../data/copy'

export default function Alert({ phraseTab }) {
  const [isVisible, setIsVisible] = useState(false)

  let tab

  if (phraseTab === copy.tabs.correct) {
    tab = copy.tabs.correct
  } else if (phraseTab === copy.tabs.wrong) {
    tab = copy.tabs.wrong
  } else {
    tab = copy.tabs.withoutAnswer
  }

  return (
    <div role="alert">
      <button></button>
      <p>Фраза отправлена в группу {tab} </p>
    </div>
  )
}

Alert.propTypes = {
  phraseTab: PropTypes.string.isRequired
}