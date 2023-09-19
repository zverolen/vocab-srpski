import ButtonWithIcon from './ButtonWithIcon'

const color_reference = {
  primary: 'rgba(0, 0, 0, 0.87)',
  secondary: 'rgb(255, 255, 255)',
  humble: 'rgba(0, 0, 0, 0.4)',
  correct: 'rgb(62, 101, 75)',
  wrong: 'rgb(164, 65, 65)',
  correctHumble: 'rgb(228, 246, 234)',
  wrongHumble: 'rgb(246, 228, 228)'
}

describe('<ButtonWithIcon />', () => {
  it('Default variant renders correctly in all states', () => {
    cy.mount(<ButtonWithIcon handleClick={() => {}} isOpen={false}/>)
    cy.get('button').should('have.text', 'Меню')
    cy.get('button').find('svg').should('exist').and('have.css', 'fill', color_reference.humble)
    cy.get('button')
      .should('have.css', 'border', `0px none ${color_reference.primary}`)
      .and('have.css', 'height', '48px')
      .and('have.css', 'background-color', color_reference.secondary)
    cy.get('button').find('span span:first-child()')
      .should('have.css', 'text-decoration', `underline ${color_reference.primary}`)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.secondary} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.secondary)
      .and('have.css', 'color', color_reference.primary)
    cy.get('button').find('svg').should('have.css', 'fill', color_reference.primary)
  })

  it('Expanded menu variant renders correctrly in all states', () => {
    cy.mount(<ButtonWithIcon handleClick={() => {}} isOpen={true}/>)
    cy.get('button').should('have.text', 'Закрыть меню')
    cy.get('button').find('svg').should('exist').and('have.css', 'fill', color_reference.humble)
    cy.get('button')
      .should('have.css', 'border', `0px none ${color_reference.primary}`)
      .and('have.css', 'height', '48px')
    cy.get('button').find('span span:first-child()')
      .should('have.css', 'text-decoration', `underline ${color_reference.primary}`)

    cy.get('button').focus()
    cy.get('button')
      .should('have.css', 'outline', `${color_reference.secondary} solid 6px`)
      .and('have.css', 'box-shadow', `${color_reference.primary} 0px 0px 0px 8px`)
      .and('have.css', 'background-color', color_reference.secondary)
      .and('have.css', 'color', color_reference.primary)
    cy.get('button').find('svg').should('have.css', 'fill', color_reference.primary)
  })
})