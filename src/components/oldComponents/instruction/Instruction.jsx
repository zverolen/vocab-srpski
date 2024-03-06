import Disclosure from '../disclosure/Disclosure'
import { copy } from '../../data/copy'

export default function Instruction() {
  return (
    <Disclosure captionWhenCollapsed={copy.instruction.heading}>
      <ol className="instruction">
        <li><p>{copy.instruction[1]}</p></li>
        <li><p>{copy.instruction[2]}</p></li>
        <li><p>{copy.instruction[3]}</p></li>
        <li><p>{copy.instruction[4]}</p></li>
        <li><p>{copy.instruction[5]}</p></li>
        <li><p>{copy.instruction[6]}</p></li>
      </ol>
    </Disclosure>
  )
}