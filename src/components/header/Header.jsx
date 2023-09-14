import PropTypes from 'prop-types'

import HideAndReveal from "../hideAndReveal/HideAndReveal";
import ButtonWithToggle from "../buttonWithToggle/ButtonWithToggle";
import Menu from "../menu/Menu";
import Hint from '../hint/Hint';

export default function Header({autoSortOn, onAutoSortToggle}) {
  return (
    <header>
      <div>
        <HideAndReveal>
          <Menu>
            <li>
              <ButtonWithToggle ariaDescribedby="autosort-description" isOn={autoSortOn} handleToggle={onAutoSortToggle}/>
              <Hint />
            </li>
          </Menu>
        </HideAndReveal>
      </div>
    </header>
  )
}

Header.propTypes = {
  autoSortOn: PropTypes.bool,
  onAutoSortToggle: PropTypes.func
}