import React from 'react'
import {Navbar, Footer} from './components'
import Routes from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <ToastContainer autoClose={3000} />
      <Footer />
    </div>
  )
}

export default App
