import { copy } from '../../data/copy'

export default function Footer() {
  return(
    <footer>
      <h2>{copy.feedback.heading}</h2>
      <p>{copy.feedback.text} <a href={`mailto:${copy.feedback.email}`}>{copy.feedback.email}</a></p>
      <p>{copy.github.text} <a href={copy.github.link}>{copy.github.link}</a></p>
    </footer>
  )
}