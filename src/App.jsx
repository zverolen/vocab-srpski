import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { fetchPhrases, selectPhrasesStatus } from './features/phrases/phrasesSlice'

import HeaderTwo from './components/headerTwo/HeaderTwo'
import FooterTwo from './components/footerTwo/FooterTwo'

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
      <HeaderTwo />
     
      <aside>
        <Stats />
      </aside>

      <main>
        <Outlet />
      </main>

      <FooterTwo />
    </div>
  )
}

export default App
