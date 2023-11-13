import Alert from './Alert'

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

describe('<Alert />', () => {
  it('<Alert /> without answer renders correctly', () => {
    cy.mount(<Alert phraseTab="unset" isVisible={true} />)

    cy.get('[role="alert"]')
      .should('have.css', 'border', `1px solid ${color_reference.white}`)
      .and('have.css', 'color', color_reference.white)
      .and('have.text', 'Фраза отправлена в группу "Без ответа"')

    cy.get('[role="alert"]').find('p')
      .should('have.css', 'font-weight', '600')
  })

  it('Correct <Alert /> enders correctly', () => {
    cy.mount(<Alert phraseTab="correct" isVisible={true} />)

    cy.get('[role="alert"]')
      .should('have.css', 'border', `1px solid ${color_reference.greenDarkTheme}`)
      .and('have.css', 'color', color_reference.greenDarkTheme)
      .and('have.text', 'Фраза отправлена в группу "Знаю"')
  })

  it('Wrong <Alert /> enders correctly', () => {
    cy.mount(<Alert phraseTab="wrong" isVisible={true} />)

    cy.get('[role="alert"]')
      .should('have.css', 'border', `1px solid ${color_reference.redDarkTheme}`)
      .and('have.css', 'color', color_reference.redDarkTheme)
      .and('have.text', 'Фраза отправлена в группу "Учу"')
  })
})