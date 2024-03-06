import Instruction from './Instruction'

describe('<Instruction />', () => {
  it('Renders correctly', () => {
    cy.mount(<Instruction />)

    cy.get('button').should('have.text', 'Инструкция')
    cy.getByTest('disclosure').children().should('have.length', '2')

    cy.get('button').click()
    cy.getByTest('disclosure').children().should('have.length', '3')
    cy.get('ol').children().should('have.length', '6')

    cy.get('button').click()
    cy.getByTest('disclosure').children().should('have.length', '2')
  })
})