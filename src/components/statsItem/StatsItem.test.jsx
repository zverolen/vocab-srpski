import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { store } from '../../store/store'
import { Provider } from 'react-redux'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import StatsItem from './StatsItem'

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={ <StatsItem name="Знаю!" statNum="10" statPercent="50%" id="correct" route="/know" /> }>
    {/* <Route index element={ <Phrases />} />
    <Route path="remaining" element={ <PhrasesRemaining />} />
    <Route path="know" element={ <PhrasesCorrect />} />
    <Route path="learn" element={ <PhrasesWrong />} />
    <Route path="all" element={ <PhrasesAll />} /> */}
  </Route>
))

describe('Renders', () => {
  it('Renders', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    )
    screen.debug()

    
  })
})