import { render, screen } from '@testing-library/react'

import HeaderTwo from './HeaderTwo'

describe('HeaderTwo', () => {
  it('Renders', () => {
    render(<HeaderTwo />)

    screen.debug()
  })
})