import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { store } from '../../store/store'
import { Provider } from 'react-redux'

import Phrases from '../../features/phrases/Phrases'

describe('<SessionOverview />', () => {

  it('Renders correctly at the beginning of the session', () => {
    render(<Provider store={store}><Phrases /></Provider>)
    
    // screen.debug()

    expect(screen.getByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toBeInTheDocument
  })

  it('A phrase appears in the list after being checked as "correct"', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Знаю!', {selector: 'button'}))
    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    expect(screen.getByText('Это твоя книга?', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)
  })

  it('A phrase appears in the list after being checked as "incorrect"', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Учу!', {selector: 'button'}))
    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)
  })

  it('A phrase appears in the list after being skipped', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    expect(screen.getByText('Это мой ребёнок.', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)
  })

  it('A phrase appears in the list after being skipped', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    // screen.debug()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    expect(screen.getByText('Это твоя сестра.', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)
  })

  it('A phrase does NOT appear in the list after being checked as "correct"', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    screen.debug()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Знаю!', {selector: 'button'}))
    await user.click(screen.getByText('Повторить', {selector: 'button'}))

    expect(screen.queryAllByText('Это его дом.', {selector: 'td'})).toHaveLength(0)
  })

  it('A phrase does NOT appear in the list after being checked as "incorrect"', async () => {
    const user = userEvent.setup()
    render(<Provider store={store}><Phrases /></Provider>)

    screen.debug()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))
    await user.click(screen.getByText('Учу!', {selector: 'button'}))
    await user.click(screen.getByText('Попробовать снова', {selector: 'button'}))

    expect(screen.queryAllByText('Это мой хороший друг.', {selector: 'td'})).toHaveLength(0)
  })
})