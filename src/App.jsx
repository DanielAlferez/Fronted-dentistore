import { MdDashboard } from 'react-icons/md';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home'
import Error404 from "./containers/errors/Error404";
import {ProductsProvider} from './context/ProductsContext';
import Dashboard from "./components/Admin/Dasboard";
import Products from "./components/Shop/Products"
import AboutUs from "./containers/static/AboutUs";
import Contact from "./containers/static/Contact";
import PaymentMet from "./containers/static/PatmentMetPrin";
import CartPage from "./components/Shop/CartPage";
import Payment from "./components/Shop/Payment";


function RequireAdmin({children}){

  // aqui ustedes van a traer los datos de la sesion si es que lo esta

  //if() return children; // por si es admin
  // return <Navigate to="" state_={{from: location}} replace /> el to es hacia donde lo van a redirigir por si no es admin

}


function App() {
  return (
    <ProductsProvider>
      <Router>
          <Routes>
            {/* Error Display */}
            <Route path='*' element={<Error404/>}/>
            {/* Home */}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/admin' element={
            <RequireAdmin>
              <Dashboard/>
            </RequireAdmin>
            }/>
            <Route exact path='/productos' element={<Products/>}/>
            <Route exact path='/nosotros' element={<AboutUs/>}/>
            <Route exact path='/contacto' element={<Contact/>}/>
            <Route exact path='/medios-pago' element={<PaymentMet/>}/>
            <Route exact path='/carrito' element={<CartPage/>}/>
            <Route exact path='/pagos' element={<Payment/>}/>
            {/* <Route exact path='/productos/:id' element={<Product/>}/> */}
          </Routes>
      </Router> 
    </ProductsProvider>
  )
}

export default App
