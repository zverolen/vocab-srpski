import { render, screen } from '@testing-library/react'

import SessionOverviewRow from './SessionOverviewRow'
import { phrases } from '../../data/data'

const correctPhrase = {...phrases[0], phraseSessionStatus: 'correct'}
const incorrectPhrase = {...phrases[1], phraseSessionStatus: 'wrong'}
const skippedPhrase = {...phrases[2], phraseSessionStatus: 'skipped'}

describe('<SessionOverviewRow />', ()=> {
  it('Renders correctly with correct phrase', () => {
    render(<SessionOverviewRow key={correctPhrase.id} data={correctPhrase} />)

    screen.debug()

    expect(screen.getByText('Это твоя книга?', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.getByText('Da li je ovo tvoja knjiga?', {selector: 'td:nth-child(2)'})).toBeInTheDocument
    expect(screen.getByText('🧐', {selector: 'td:nth-child(3) span:nth-child(1)'})).toBeInTheDocument
    expect(screen.getByText('Знаю!', {selector: 'td:nth-child(3) span:nth-child(2)'})).toBeInTheDocument
  })

  it('Renders correctly with incorrect phrase', () => {
    render(<SessionOverviewRow key={incorrectPhrase.id} data={incorrectPhrase} />)

    screen.debug()

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.getByText('To nije njegov sat.', {selector: 'td:nth-child(2)'})).toBeInTheDocument
    expect(screen.getByText('🤔', {selector: 'td:nth-child(3) span:nth-child(1)'})).toBeInTheDocument
    expect(screen.getByText('Учу!', {selector: 'td:nth-child(3) span:nth-child(2)'})).toBeInTheDocument
  })

  it('Renders correctly with skipped phrase', () => {
    render(<SessionOverviewRow key={skippedPhrase.id} data={skippedPhrase} />)

    screen.debug()

    expect(screen.getByText('Это мой ребёнок.', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.getByText('To je moje dete.', {selector: 'td:nth-child(2)'})).toBeInTheDocument
    expect(screen.getByText('Пропущено', {selector: 'td:nth-child(3) span:nth-child(1)'})).toBeInTheDocument
  })
})
