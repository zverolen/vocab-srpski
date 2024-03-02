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
import AllCorrectPhrase from './routes/allCorrectPhrases.jsx'
import App from './App.jsx'
import './index.css'

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

//practice, know, learn, all-stats, error, user (+form)
const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/" element={ <App/> }>
    <Route path="know" element={ <AllCorrectPhrase />} />
    
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
