import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

import { store } from '../../src/store/store'
import { Provider } from 'react-redux'

import App from '../../src/App'

describe('User skipps all phrases in a session', () => {
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

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это не его часы.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()
    
    expect(screen.queryByText('Это твоя книга?', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это твоя книга?', {selector: 'td:nth-child(1)'})).toBeInTheDocument
    expect(screen.queryAllByText('Здесь появятся фразы, с которыми вы поработали', {selector: '#sessionOverview p'})).toHaveLength(0)

    /** Statistics section changes */

    expect(screen.getByText('9', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('90%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 2. Second phrase practice */
    // screen.debug()

    expect(screen.getByText('Это не его часы.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это мой ребёнок.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это не его часы.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('8', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('80%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 3. Third phrase practice */
    // screen.debug()

    expect(screen.getByText('Это мой ребёнок.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это твоя сестра.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой ребёнок.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('7', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('70%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 4. Fourth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это твоя сестра.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это его дом.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это твоя сестра.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('6', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('60%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 5. Fifth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это его дом.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это мой хороший друг.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это его дом.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('5', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('50%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 6. Sixth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это мой хороший друг.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Кем работает твоя сестра?', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это мой хороший друг.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('4', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('40%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 7. Seventh phrase practice */
    // screen.debug()

    expect(screen.getByText('Кем работает твоя сестра?', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Это её подруга.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Кем работает твоя сестра?', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('3', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('30%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 8. Eighth phrase practice */
    // screen.debug()

    expect(screen.getByText('Это её подруга.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Моя сестра красивая.', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Это её подруга.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('2', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('20%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 9. Ninth phrase practice */
    // screen.debug()

    expect(screen.getByText('Моя сестра красивая.', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */

    expect(screen.getByText('Кто доктор?', {selector: '#practice p'})).toBeInTheDocument()
    expect(screen.getByText('Проверить', {selector: 'button'})).toBeInTheDocument()
    expect(screen.getByText('Пропустить', {selector: 'button'})).toBeInTheDocument()

    expect(screen.queryByText('Моя сестра красивая.', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('1', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('10%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()

    /** 10. Tenth phrase practice */
    // screen.debug()

    expect(screen.getByText('Кто доктор?', {selector: '#practice p'})).toBeInTheDocument()

    await user.click(screen.getByText('Пропустить', {selector: 'button'}))

    /** Practice section changes */
    expect(screen.getByText('Фразы закончились! Начните сессию снова или поработайте с отдельными фразами.', {selector: '#practice p'})).toBeInTheDocument()

    expect(screen.queryByText('Кто доктор?', {selector: '#practice span:nth-child(1)'})).not.toBeInTheDocument()

    /** Sessioin section changes */

    expect(screen.getByText('Это не его часы.', {selector: 'td:nth-child(1)'})).toBeInTheDocument

    /** Statistics section changes */

    expect(screen.getByText('0', {selector: '#remaining span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#remaining span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#correct span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#correct span:nth-child(4)'})).toBeInTheDocument()
    expect(screen.getByText('0', {selector: '#wrong span:nth-child(2)'})).toBeInTheDocument()
    expect(screen.getByText('0%', {selector: '#wrong span:nth-child(4)'})).toBeInTheDocument()
  })
})
