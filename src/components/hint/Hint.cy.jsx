import Hint from "./Hint";

const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('<Hint />', () => {
  it('Renders correctly', () => {
    cy.mount(<Hint />)
    cy.getByTest('hint').should('have.text', 'Последовательность при автоматической сортировке: сначала карточки без ответа, затем верный ответ, затем неверный ответ')
    cy.get('svg').should('have.css', 'fill', `${color_reference.humble}`)
  })
})