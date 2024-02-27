import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { store } from '../../store/store'
import { Provider } from 'react-redux'

import Phrases from './Phrases'

describe('<Phrases />', () => {

  it('User sees a correct first screen', () => {
    render(<Provider store={store}><Phrases /></Provider>)

    expect(screen.getByText('Как сказать по-сербски?')).toBeInTheDocument()
    expect(screen.getByText('Фразы в этой сессии:')).toBeInTheDocument()
   
  })

  it('User skips a phrase', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    expect(screen.getByText('Это не его часы.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.queryByText('Это твоя книга?', {selector: '#practice p'})).not.toBeInTheDocument()

  })

  it('User answers correctly and finishes the phrase', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это не его часы.')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Знаю!', {selector: 'button'}))
    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    expect(screen.getByText('Это мой ребёнок.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.queryByText('Это не его часы.', {selector: '#practice p'})).not.toBeInTheDocument()

  })

  it('<Practice /> correctly handles finishing phrase (marked "incorrectly")', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это мой ребёнок.')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Учу!', {selector: 'button'}))
    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    expect(screen.getByText('Это твоя сестра.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.queryByText('Это мой ребёнок.', {selector: '#practice p'})).not.toBeInTheDocument()

  })

  it('<Practice /> correctly handles repeating phrase (marked "correctly")', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя сестра.')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Знаю!', {selector: 'button'}))
    await user.click(screen.getByText('Повторить', {selector: 'button'}))

    expect(screen.getByText('Это его дом.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.queryByText('Это твоя сестра.', {selector: '#practice p'})).not.toBeInTheDocument()

  })

  it('<Practice /> correctly handles repeating phrase (marked "incorrectly")', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это его дом.')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Учу!', {selector: 'button'}))
    await user.click(screen.getByText('Попробовать снова', {selector: 'button'}))

    expect(screen.getByText('Это мой хороший друг.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.queryByText('Это его дом.', {selector: '#practice p'})).not.toBeInTheDocument()

  })

  it('<Practice /> correctly handles finishing all phrases', async () => {
    const user = userEvent.setup()

    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это мой хороший друг.')).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))
    await user.click(screen.getByText('Пропустить', {selector: 'button'}))
    await user.click(screen.getByText('Пропустить', {selector: 'button'}))
    await user.click(screen.getByText('Пропустить', {selector: 'button'}))
    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    expect(screen.getByText('Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.', {selector: '#practice p'})).toBeInTheDocument()

  })

})