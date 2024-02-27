import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import Practice from './Practice'
import { store } from '../../store/store'
import { Provider } from 'react-redux'

describe('<Practice />', () => {

  it('Renders correctly',() => {
    render(<Provider store={store}><Practice /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()
    expect(screen.queryByText('Da li je ovo tvoja knjiga?')).not.toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()
  })

  it('Flow: give correct answer', async ()=> {
    const user = userEvent.setup()
    render(<Provider store={store}><Practice /></Provider>)

    // screen.debug()

    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Da li je ovo tvoja knjiga?')).toBeInTheDocument()
    expect(screen.queryByText('Это твоя книга?')).not.toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Знаю:')).toBeInTheDocument()
    expect(screen.getByText('Это твоя книга?')).toBeInTheDocument()
    expect(screen.getByText('Da li je ovo tvoja knjiga?')).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))
})

it('Flow: give wrong answer', async ()=> {
  const user = userEvent.setup()
  render(<Provider store={store}><Practice /></Provider>)

  // screen.debug()

  expect(screen.getByText('Это не его часы.')).toBeInTheDocument()

  await user.click(screen.getByText('Проверить', {selector: 'button'}))

  expect(screen.getByText('To nije njegov sat.')).toBeInTheDocument()
  expect(screen.queryByText('Это не его часы.')).not.toBeInTheDocument()
  expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
  expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()
  expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
  expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

  await user.click(screen.getByText('Учу!', {selector: 'button'}))

  expect(screen.getByText('Учу:')).toBeInTheDocument()
  expect(screen.getByText('Это не его часы.')).toBeInTheDocument()
  expect(screen.getByText('To nije njegov sat.')).toBeInTheDocument()
  expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
  expect(screen.getByText('Попробовать снова', {selector: 'button'})).toBeInTheDocument()
  expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
  expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()
  })

})
