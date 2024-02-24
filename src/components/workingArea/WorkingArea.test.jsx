import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import WorkingArea from './WorkingArea'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

describe('<WorkingArea />', () => {

  it('Renders correctly',() => {
    render(<Provider store={store}><WorkingArea /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()
    expect(screen.queryByText('Da li je ovo tvoja knjiga?')).not.toBeInTheDocument()
    expect(screen.getByText('Проверить')).toBeInTheDocument()
    expect(screen.getByText('Пропустить')).toBeInTheDocument()
  })

  it('Flow: give correct answer', async ()=> {
    const user = userEvent.setup()
    render(<Provider store={store}><WorkingArea /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить'))

    expect(screen.getByText('Da li je ovo tvoja knjiga?')).toBeInTheDocument()
    expect(screen.queryByText('Это твоя книга?')).not.toBeInTheDocument()
    expect(screen.getByText('Знаю!')).toBeInTheDocument()
    expect(screen.getByText('Учу!')).toBeInTheDocument()
    expect(screen.queryByText('Проверить')).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить')).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!'))

    expect(screen.getByText('Знаю:')).toBeInTheDocument()
    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()
    expect(screen.getByText('Da li je ovo tvoja knjiga?')).toBeInTheDocument()
    expect(screen.getByText('Закончить')).toBeInTheDocument()
    expect(screen.getByText('Повторить')).toBeInTheDocument()
    expect(screen.queryByText('Знаю!')).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!')).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить'))
})

it('Flow: give wrong answer', async ()=> {
  const user = userEvent.setup()
  render(<Provider store={store}><WorkingArea /></Provider>)

  screen.debug()

  expect(screen.getByText('Это не его часы.')).toBeInTheDocument()

  await user.click(screen.getByText('Проверить'))

  expect(screen.getByText('To nije njegov sat.')).toBeInTheDocument()
  expect(screen.queryByText('Это не его часы.')).not.toBeInTheDocument()
  expect(screen.getByText('Знаю!')).toBeInTheDocument()
  expect(screen.getByText('Учу!')).toBeInTheDocument()
  expect(screen.queryByText('Проверить')).not.toBeInTheDocument()
  expect(screen.queryByText('Пропустить')).not.toBeInTheDocument()

  await user.click(screen.getByText('Учу!'))

  expect(screen.getByText('Учу:')).toBeInTheDocument()
  expect(screen.getByText('Это не его часы.')).toBeInTheDocument()
  expect(screen.getByText('To nije njegov sat.')).toBeInTheDocument()
  expect(screen.getByText('Закончить')).toBeInTheDocument()
  expect(screen.getByText('Попробовать снова')).toBeInTheDocument()
  expect(screen.queryByText('Знаю!')).not.toBeInTheDocument()
  expect(screen.queryByText('Учу!')).not.toBeInTheDocument()
  })

})
