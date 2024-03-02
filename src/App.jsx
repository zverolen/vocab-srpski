import { Outlet } from 'react-router-dom'

import HeaderTwo from './components/headerTwo/HeaderTwo'
import FooterTwo from './components/footerTwo/FooterTwo'

import Phrases from './features/phrases/Phrases'
import Stats from './components/stats/Stats'
import TestNav from './components/testNav/TestNav'

function App() {

  return (
    <div className="layout site-frame">
      <HeaderTwo />
     
      <aside>
        <Stats />
      </aside>

      <main>
        <Phrases />
      </main>

      <FooterTwo />
    </div>
  )
}

export default App
