import Tab from './Tab'

const color_reference = {
  black: 'rgb(33, 33, 33)',
  white: 'rgb(255, 255, 255)',
  greyDark: 'rgb(51, 51, 51)',
  greyMedium: 'rgb(133, 133, 133)',
  greyLight: 'rgb(235, 235, 235)',
  greenDark: 'rgb(51, 84, 79)',
  greenLight: 'rgb(242, 252, 251)',
  redDark: 'rgb(128, 49, 63)',
  redLight: 'rgb(252, 245, 246)'
}

describe('<Tab />', () => {
  it('Selected tab (without answer) is rendered correctly', () => {
    cy.mount(<Tab id="1" isSelected={ true } onSelect={() => {}} onNavigation={() => {}} score="34">Без ответа</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-1')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'aria-controls', 'tabpanel-1')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '10px')
      .and('have.css', 'border-width', '2px 2px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.black)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.white)
      .and('have.css', 'outline', `${color_reference.black} 0px`)
      .and('have.css', 'box-shadow', 'none')
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.black} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.white} solid 2px`)
  })

  it('Selected correct tab is rendered correctly', () => {
    cy.mount(<Tab id="2" isSelected={ true } onSelect={() => {}} onNavigation={() => {}} score="34" className="correct">Знаю</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-2')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'aria-controls', 'tabpanel-2')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '10px')
      .and('have.css', 'border-width', '2px 2px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.greenDark)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.white)
      .and('have.css', 'outline', `${color_reference.greenDark} 0px`)
      .and('have.css', 'box-shadow', 'none')
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.greenDark} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.white} solid 2px`)
  })

  it.only('Selected wrong tab is rendered correctly', () => {
    cy.mount(<Tab id="3" isSelected={ true } onSelect={() => {}} onNavigation={() => {}} score="34" className="wrong">Учу</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-3')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'aria-controls', 'tabpanel-3')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '10px')
      .and('have.css', 'border-width', '2px 2px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.redDark)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.white)
      .and('have.css', 'outline', `${color_reference.redDark} 0px`)
      .and('have.css', 'box-shadow', 'none')
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.redDark} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.white} solid 2px`)
  })

  it('Not Selected tab (without answer) is rendered correctly', () => {
    cy.mount(<Tab id="1" isSelected={ false } onSelect={() => {}} onNavigation={() => {}} score="34">Без ответа</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-1')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'aria-controls', 'tabpanel-1')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '6')
      .and('have.css', 'border-width', '1px 1px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.dark)
  })

  it('Not selected correct tab is rendered correctly', () => {
    cy.mount(<Tab id="2" isSelected={ false } onSelect={() => {}} onNavigation={() => {}} score="34" className="correct">Знаю</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-2')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'aria-controls', 'tabpanel-2')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '6px')
      .and('have.css', 'border-width', '1px 21px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.greenDark)
  })

  it('Not selected wrong tab is rendered correctly', () => {
    cy.mount(<Tab id="3" isSelected={ false } onSelect={() => {}} onNavigation={() => {}} score="34" className="wrong">Учу</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-3')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'aria-controls', 'tabpanel-3')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '6px')
      .and('have.css', 'border-width', '1px 1px 0px')
      .and('have.css', 'background-color', color_reference.white)
      .and('have.css', 'border-color', color_reference.redDark)
  })
})