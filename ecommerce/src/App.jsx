import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AddAddress from './pages/AddAddress';
import AddPayment from './pages/AddPayment';
import OrderSuccess from './pages/OrderSuccess';

function App() {
    return (
        //Routes picks the first <Router> whose path matches the current URL
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/add-payment' element={<AddPayment />} />
            <Route path='/order-success' element={<OrderSuccess />} />
        </Routes>
    );
}

export default App;