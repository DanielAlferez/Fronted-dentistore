import { MdDashboard } from 'react-icons/md';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import Error404 from "./containers/errors/Error404";
import {ProductsProvider} from './context/ProductsContext';
import Dashboard from "./components/Admin/Dasboard";
import Products from "./components/Shop/Products";

function App() {
  return (
    <ProductsProvider>
      <Router>
          <Routes>
            {/* Error Display */}
            <Route path='*' element={<Error404/>}/>
            {/* Home */}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/admin' element={<Dashboard/>}/>
            <Route exact path='/productos' element={<Products/>}/>
            {/* <Route exact path='/productos/:id' element={<Product/>}/> */}
          </Routes>
      </Router> 
    </ProductsProvider>
  )
}

export default App
