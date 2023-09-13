import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './components/header/Header'

function App() {
  const [isAutoSortOn, setIsAutoSortOn] = useState(false)

  function handleAutoSortToggle() {
    setIsAutoSortOn(!isAutoSortOn)
  }

  return (
    <>
      <Header autoSortOn={isAutoSortOn} onAutoSortToggle={handleAutoSortToggle} />
    </>
  )
}

export default App
