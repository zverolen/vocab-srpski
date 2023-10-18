import Disclosure from "../disclosure/Disclosure"
import { copy } from "../../data/copy"

export default function Instruction() {
  return (
    <Disclosure captionWhenCollapsed={copy.instruction.heading}>
      <ol className="instruction">
        <li>{copy.instruction[1]}</li>
        <li>{copy.instruction[2]}</li>
        <li>{copy.instruction[3]}</li>
        <li>{copy.instruction[4]}</li>
        <li>{copy.instruction[5]}</li>
        <li>{copy.instruction[6]}</li>
      </ol>
    </Disclosure>
  )
}