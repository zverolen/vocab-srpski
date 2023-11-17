import { copy } from '../../data/copy'
export default function Header() {
  return (
    <header className="title">
      <h1>{copy.title.heading}</h1>
      <p>{copy.title.subheading}</p>
    </header>
  )
}