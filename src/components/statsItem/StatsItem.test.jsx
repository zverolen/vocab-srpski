import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import StatsItem from './StatsItem'

const statName = 'Осталось'
const statNum = 10
const statPercent = 8
const id = 'remaining'

describe('<StatsItem />', () => {
  it('Renders correctly', () =>{
    render(<StatsItem id={id} name={statName} statNum={statNum} statPercent={statPercent}/>)

    expect(screen.getByText('Осталось', {selector: 'a span'})).toBeInTheDocument()
    expect(screen.getByText('10', {selector: 'a span'})).toBeInTheDocument()
    expect(screen.getByText('8%', {selector: 'a span'})).toBeInTheDocument()
  })
})