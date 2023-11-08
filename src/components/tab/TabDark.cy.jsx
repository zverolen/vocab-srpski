import Tab from './Tab'

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

describe('<Tab />', () => {
  it('Selected tab (without answer) is rendered correctly', () => {
    cy.mount(<Tab id="1" isSelected={ true } onSelect={() => {}} onNavigation={() => {}} score={34} >Без ответа</Tab>)

    cy.get('button')
      .should('have.attr', 'id', 'tab-1')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'aria-controls', 'tabpanel-1')
      .and('have.attr', 'tabindex', '0')
      .and('have.css', 'padding-top', '10px')
      .and('have.css', 'border-width', '2px 2px 0px')
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.white)
      .and('have.css', 'color', color_reference.black)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.black)
      .and('have.css', 'outline', `${color_reference.white} 0px`)
      .and('have.css', 'box-shadow', 'none')
      .and('have.css', 'color', color_reference.white)
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.white} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.black} solid 2px`)
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
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.greenDarkTheme)
      .and('have.css', 'color', color_reference.greenDarkTheme)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.black)
      .and('have.css', 'outline', `${color_reference.greenDarkTheme} 0px`)
      .and('have.css', 'box-shadow', 'none')
      .and('have.css', 'color', color_reference.black)
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.greenDarkTheme} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.black} solid 2px`)
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
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.redDarkTheme)
      .and('have.css', 'color', color_reference.white)

    cy.get('button').focus()
    
    cy.get('button')
      .should('have.css', 'background-color', color_reference.black)
      .and('have.css', 'outline', `${color_reference.redDarkTheme} 0px`)
      .and('have.css', 'box-shadow', 'none')
      .and('have.css', 'color', color_reference.redDarkTheme)
    
    cy.get('button').find('> span')
      .should('have.css', 'box-shadow', `${color_reference.redDarkTheme} 0px 0px 0px 4px`)
      .and('have.css', 'outline', `${color_reference.black} solid 2px`)
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
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.white)
      .and('have.css', 'color', color_reference.white)
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
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.greenDarkTheme)
      .and('have.css', 'color', color_reference.white)
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
      .and('have.css', 'background-color', color_reference.black)
      .and('have.css', 'border-color', color_reference.redDarkTheme)
      .and('have.css', 'color', color_reference.white)
  })
})