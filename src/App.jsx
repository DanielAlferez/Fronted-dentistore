import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Provider} from "react-redux"
import store from "./store"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import products from './data/products';
import Home from './components/home/Home'
import Error404 from "./containers/errors/Error404";
import {ProductsProvider} from './context/ProductsContext';

import Login from './containers/auth/Login'


function App() {
  return (
    <ProductsProvider>
      <Router>
          <Routes>
            {/* Error Display */}
            <Route path='*' element={<Error404/>}/>
            <Route exact path='/' element={<Home/>}/>

            <Route exact path='/login' element={<Login/>}/>
          </Routes>
      </Router> 
    </ProductsProvider>
  )
}

export default App
