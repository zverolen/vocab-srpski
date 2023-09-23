import Toggle from './Toggle'

const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('<Toggle />', () => {
  it('OFF variant - renders correctly in all states', () => {
    cy.mount(<Toggle isOn={false}/>)

    cy.getByTest('toggle').find('> div')
      .should('have.css', 'width', '72px')
      .and('have.css', 'height', '30px')
      .and('have.css', 'background-color', `${color_reference.secondary}`)

    cy.getByTest('toggle').find('> div > div')
      .should('have.css', 'width', '20px')
      .and('have.css', 'height', '26px')
      .and('have.css', 'background-color', `${color_reference.secondary}`)

    cy.get('span')
      .should('have.css', 'color', `${color_reference.primary}`)
      .and('have.css', 'text-transform', 'uppercase')
      .and('have.text', 'Выкл')  

    cy.get('svg')
      .should('exist')
      .and('have.css', 'stroke', `${color_reference.humble}`)
  })

  it('ON variant - renders correctly in all states', () => {
    cy.mount(<Toggle isOn={true}/>)

    cy.getByTest('toggle').find('> div')
      .should('have.css', 'background-color', `${color_reference.correctHumble}`)
      .and('have.css', 'border-color', `${color_reference.correct}`)
      .and('have.css', 'flex-direction', 'row-reverse')

    cy.get('span')
      .should('have.css', 'color', `${color_reference.correct}`)
      .and('have.text', 'Вкл')

    cy.get('svg')
      .should('have.css', 'stroke', `${color_reference.correct}`)

    cy.getByTest('toggle').find('> div > div')
      .should('have.css', 'border-color', `${color_reference.correct}`)
  })
})