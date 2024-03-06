import Disclosure from './Disclosure'

const sample_children = <p>Sample content</p>

describe('<Disclusure />', () => {
  it('Works correctly', () => {
    cy.mount(<Disclosure captionWhenCollapsed="Инструкция">{sample_children}</Disclosure>)
    cy.getByTest('disclosure')
      .should('have.text', 'ИнструкцияИнструкция')
      .and('have.attr', 'aria-live', 'polite')
    cy.getByTest('button-with-icon')
      .should('have.text', 'Инструкция')
      .and('have.attr', 'aria-expanded', 'false')
    cy.getByTest('button-with-icon').find('span svg')
      .should('have.class', 'plus')
    

    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').find('p').should('exist')
    cy.getByTest('disclosure').should('have.text', 'ИнструкцияИнструкцияSample content')
    cy.getByTest('button-with-icon').should('have.attr', 'aria-expanded', 'true')
    cy.getByTest('button-with-icon').find('span svg')
      .should('have.class', 'minus')

    cy.getByTest('button-with-icon').click()
    cy.getByTest('disclosure').should('have.text', 'ИнструкцияИнструкция')
    cy.getByTest('button-with-icon').find('span svg')
      .should('have.class', 'plus')
  })
})