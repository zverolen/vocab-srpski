import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { fetchPhrases, selectPhrasesStatus } from './features/phrases/phrasesSlice'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Stats from './components/stats/Stats'

function App() {

  const dispatch = useDispatch()
  const status = useSelector(selectPhrasesStatus)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPhrases())
    }
  }, [status, dispatch])

  return (
    <div className="layout site-frame">
      <Header />
     
      <aside>
        <Stats />
      </aside>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App
