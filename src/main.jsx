import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom"
import { store } from './store/store.js'
import ErrorPage from './components/errorPage/ErrorPage.jsx'
import PhrasesPractice from './components/phrasesPractice/PhrasesPractice.jsx'
import PhrasesRemaining from './components/phrasesRemaining/phrasesRemaining.jsx'
import PhrasesAll from './components/phrasesAll/PhrasesAll.jsx'
import PhrasesCorrect from './components/phrasesCorrect/PhrasesCorrect.jsx'
import PhrasesWrong from './components/PhrasesWrong/PhrasesWrong.jsx'
import Phrases from './features/phrases/Phrases.jsx'
import App from './App.jsx'
import './index.css'
// import Account from './tempAccount.jsx'
// import TempPage from './tempPage.jsx'
import Account from './components/account/Account.jsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: 'know',
//         element: <AllCorrectPhrase />
//       }
//     ]
//   },
// ])

const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={ <App/> }>
    <Route index element={ <Phrases />} />
    <Route path="remaining" element={ <PhrasesRemaining />} />
    <Route path="know" element={ <PhrasesCorrect />} />
    <Route path="learn" element={ <PhrasesWrong />} />
    <Route path="all" element={ <PhrasesAll />} />
    <Route path="account" element={ <Account /> } />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
