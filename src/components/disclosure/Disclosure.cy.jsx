import Disclosure from './Disclosure'

const sample_children = <p>Sample content</p>

describe('<Disclusure />', () => {
  it('renders', () => {
    cy.mount(<Disclosure captionWhenCollapsed="Инструкция">{sample_children}</Disclosure>)
    cy.getByTest('button-with-icon').should('have.text', 'Инструкция')
    cy.getByTest('disclosure').should('have.text', 'ИнструкцияИнструкция')

    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').find('p').should('exist')
    cy.getByTest('disclosure').should('have.text', 'ИнструкцияИнструкцияSample content')

    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').should('have.text', 'ИнструкцияИнструкция')
  })
})