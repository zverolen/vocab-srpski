import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { store } from '../../src/store/store'
import { Provider } from 'react-redux'

import App from '../../src/App'

describe('User answers all phrases in a session correctly', () => {
  it('User sees the correct UI', () => {
    render(<Provider store={store}><App /></Provider>)
    /** 1. Sees the correct header */
    /** 2. Sees the correct Practice section */
    /** 3. Sees the correct Statistics section */
    // screen.debug()

    expect(screen.getByText('Эта сессия:', {selector: '#stats h2'})).toBeInTheDocument()
    expect(screen.getByText('10', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('100%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 4. Sees the correct Session section */

    expect(screen.getByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toBeInTheDocument

    /** 5. Sees the correct footer */
  })

  it('User performs the flow', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><App /></Provider>)

    /** 1. First phrase practice */
    // screen.debug()

    expect(screen.getByText('Это твоя книга?', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Da li je ovo tvoja knjiga?', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это твоя книга?', {selector: '#practice p'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Знаю:', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Это твоя книга?', {selector: '#practice span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Da li je ovo tvoja knjiga?', {selector: '#practice span:nth-child(3)'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это не его часы.', {selector: '#practice p'})).toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это твоя книга?', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)

    /** Statistics section changes */

    expect(screen.getByText('9', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('90%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('1', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('10%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()
  })
})