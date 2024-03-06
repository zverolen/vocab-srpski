import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { store } from '../../src/store/store'
import { Provider } from 'react-redux'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import App from '../../src/App'
import Phrases from '../../src/features/phrases/Phrases'
import PhrasesAll from '../../src/components/phrasesAll/PhrasesAll'
import PhrasesRemaining from '../../src/components/phrasesRemaining/phrasesRemaining'
import PhrasesCorrect from '../../src/components/phrasesCorrect/PhrasesCorrect'
import PhrasesWrong from '../../src/components/PhrasesWrong/PhrasesWrong'

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={ <App/> }>
    <Route index element={ <Phrases />} />
    <Route path="remaining" element={ <PhrasesRemaining />} />
    <Route path="know" element={ <PhrasesCorrect />} />
    <Route path="learn" element={ <PhrasesWrong />} />
    <Route path="all" element={ <PhrasesAll />} />
  </Route>
))

describe('User answers all phrases in a session correctly', () => {
  it('User sees the correct UI', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )

    await waitFor(() => expect(screen.getByText('Это твоя книга?')).toBeInTheDocument())
    /** 1. Sees the correct header */

    expect(screen.getByText('Знаю!', {selector: 'header h1'})).toBeInTheDocument()
    expect(screen.getByText('Инструкция', {selector: 'header button'})).toBeInTheDocument()
    expect(screen.getByText('Выход', {selector: 'header button'})).toBeInTheDocument()

    /** 2. Sees the correct Practice section */

    expect(screen.getByText('Как сказать по-сербски?', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Это твоя книга?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    /** 3. Sees the correct Statistics section */

    expect(screen.getByText('Эта сессия:', {selector: '#stats h2'})).toBeInTheDocument()
    expect(screen.getByText('10', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(100%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 4. Sees the correct Session section */

    expect(screen.getByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toBeInTheDocument()

    /** 5. Sees the correct footer */

    expect(screen.getByText('Project Stage 3', {selector: 'footer p'})).toBeInTheDocument()
    expect(screen.getByText('Repository on GitHub', {selector: 'footer a'})).toBeInTheDocument().and.toHaveAttribute('href', 'https://github.com/zverolen/vocab-srpski')
    expect(screen.getByText('Previous stages:', {selector: 'footer p'})).toBeInTheDocument()
    expect(screen.getByText('Stage 2', {selector: 'footer a'})).toBeInTheDocument()
  })

  it('User performs the flow', async () => {
    const user = userEvent.setup()
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )

    /** 1. First phrase practice */
    // screen.debug()

    expect(screen.getByText('Это твоя книга?', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Da li je ovo tvoja knjiga?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это твоя книга?', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Da li je ovo tvoja knjiga?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это твоя книга?)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это не его часы.', {selector: '#practice span'})).toBeInTheDocument()
    
    expect(screen.queryByText('Это твоя книга?', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это твоя книга?', {selector: 'tr:nth-child(1) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(1) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(1) span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)

    /** Statistics section changes */

    expect(screen.getByText('9', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(90%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('1', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(10%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 2. Second phrase practice */
    // screen.debug()

    expect(screen.getByText('Это не его часы.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('To nije njegov sat.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это не его часы.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('To nije njegov sat.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это не его часы.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это мой ребёнок.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это не его часы.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'tr:nth-child(2) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(2) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(2) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('8', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(80%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('2', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(20%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 3. Third phrase practice */
    // screen.debug()

    expect(screen.getByText('Это мой ребёнок.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('To je moje dete.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой ребёнок.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('To je moje dete.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это мой ребёнок.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это твоя сестра.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой ребёнок.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это мой ребёнок.', {selector: 'tr:nth-child(3) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(3) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(3) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('7', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(70%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('3', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(30%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 4. Fourth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это твоя сестра.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('To je tvoja sestra.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это твоя сестра.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('To je tvoja sestra.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это твоя сестра.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это его дом.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это твоя сестра.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это твоя сестра.', {selector: 'tr:nth-child(4) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(4) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(4) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('6', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(60%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('4', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(40%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 5. Fifth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это его дом.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('To je njegova kuća.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это его дом.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('To je njegova kuća.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это его дом.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это мой хороший друг.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это его дом.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это его дом.', {selector: 'tr:nth-child(5) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(5) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(5) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('5', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(50%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('5', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(50%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 6. Sixth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это мой хороший друг.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Ovo je moj dobar drug.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой хороший друг.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это мой хороший друг.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Ovo je moj dobar drug.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Кем работает твоя сестра?', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой хороший друг.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это мой хороший друг.', {selector: 'tr:nth-child(6) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(6) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(6) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('4', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(40%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('6', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(60%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 7. Seventh phrase practice */
    // screen.debug()

    expect(screen.getByText('Кем работает твоя сестра?', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Šta je tvoja sestra?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Кем работает твоя сестра?', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Šta je tvoja sestra?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Кем работает твоя сестра?)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это её подруга.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Кем работает твоя сестра?', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Кем работает твоя сестра?', {selector: 'tr:nth-child(7) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(7) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(7) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('3', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(30%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('7', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(70%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 8. Eighth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это её подруга.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Ovo je njena drugarica.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это её подруга.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Ovo je njena drugarica.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Это её подруга.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Моя сестра красивая.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Это её подруга.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это её подруга.', {selector: 'tr:nth-child(8) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(8) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(8) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('2', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(20%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('8', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(80%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 9. Ninth phrase practice */
    // screen.debug()

    expect(screen.getByText('Моя сестра красивая.', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Moja sestra je lepa.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Моя сестра красивая.', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Moja sestra je lepa.', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Моя сестра красивая.)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Кто доктор?', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Моя сестра красивая.', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Моя сестра красивая.', {selector: 'tr:nth-child(9) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(9) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(9) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('1', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(10%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('9', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(90%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()

    /** 10. Tenth phrase practice */
    // screen.debug()

    expect(screen.getByText('Кто доктор?', {selector: '#practice span'})).toBeInTheDocument()

    await user.click(screen.getByText('Проверить', {selector: 'button'}))

    expect(screen.getByText('Ko je lekar?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Учу!', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Кто доктор?', {selector: '#practice span'})).not.toBeInTheDocument()
    expect(screen.queryByText('Проверить', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Пропустить', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Знаю!', {selector: 'button'}))

    expect(screen.getByText('Результат', {selector: '#practice h2'})).toBeInTheDocument()
    expect(screen.getByText('Знаю:', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Ko je lekar?', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('(Кто доктор?)', {selector: '#practice span'})).toBeInTheDocument()
    expect(screen.getByText('Закончить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Повторить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Знаю!', {selector: 'button'})).not.toBeInTheDocument()
    expect(screen.queryByText('Учу!', {selector: 'button'})).not.toBeInTheDocument()

    await user.click(screen.getByText('Закончить', {selector: 'button'}))

    /** Practice section changes */
    expect(screen.getByText('Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.', {selector: '#practice span'})).toBeInTheDocument()

    expect(screen.queryByText('Кто доктор?', {selector: '#practice span'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Кто доктор?', {selector: 'tr:nth-child(10) td:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('🧐', {selector: 'tr:nth-child(10) span:nth-child(1)'})).toBeInTheDocument()
    expect(screen.getByText('Знаю!', {selector: 'tr:nth-child(10) span:nth-child(2)'})).toBeInTheDocument()

    /** Statistics section changes */

    expect(screen.getByText('0', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#remaining span'})).toBeInTheDocument()
    expect(screen.getByText('10', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('(100%)', {selector: '#correct span'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span'})).toBeInTheDocument()
    expect(screen.getByText('(0%)', {selector: '#wrong span'})).toBeInTheDocument()
  })
})

