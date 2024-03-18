import { Outlet } from 'react-router-dom'


import HeaderTwo from './components/headerTwo/HeaderTwo'
import FooterTwo from './components/footerTwo/FooterTwo'

import Stats from './components/stats/Stats'

function App() {

  


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
