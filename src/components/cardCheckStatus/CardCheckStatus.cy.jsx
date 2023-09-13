import CardCheckStatus from './CardCheckStatus'

describe('<CardCheckStatus />', () => {
  it('Correct icon is rendered', () => {
    cy.mount(<CardCheckStatus status="correct"/>)
    cy.get('[data-testid="check-status"]').find('svg[data-testid="check-status-correct"]').should('exist')
  })

  it('wrong button is rendered', () => {
    cy.mount(<CardCheckStatus status="wrong"/>)
    cy.get('[data-testid="check-status"]').find('svg[data-testid="check-status-wrong"]').should('exist')
  })
})