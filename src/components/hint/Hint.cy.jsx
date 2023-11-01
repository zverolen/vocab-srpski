import Hint from "./Hint";

const color_reference = {
  black: 'rgb(33, 33, 33)',
  white: 'rgb(250, 250, 250)',
  greyDark: 'rgb(51, 51, 51)',
  greyMedium: 'rgb(133, 133, 133)',
  greyLight: 'rgb(235, 235, 235)',
  greenDarkTheme: 'rgb(27, 196, 152)',
  greenLightTheme: 'rgb(9, 130, 104)',
  redDarkTheme: 'rgb(245, 95, 174)',
  redLightTheme: 'rgb(212, 40, 130)'
}

describe('<Hint />', () => {
  it('Renders correctly', () => {
    cy.mount(<Hint />)
    cy.getByTest('hint').should('have.text', 'Последовательность при автоматической сортировке: сначала карточки без ответа, затем верный ответ, затем неверный ответ')
    cy.get('svg').should('have.css', 'fill', `${color_reference.humble}`)
  })
})