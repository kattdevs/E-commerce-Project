import {Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItem from '../components/CartItem';
import { selectCartItems, selectCartTotalPrice } from '../store/cartSlice';

function CartPage() {
    const navigate = useNavigate();
    const items = useSelector (selectCartItems);
    const total = useSelector(selectCartTotalPrice);

    //Empty cart state
    if (items.length ===0) {
        return(
            <div className='min-h-screen bg-app-bg flex flex-col items-center justify-center gap-4 p-8'>
                <ShoppingBag size={64} className='text-gray-300' />
                <p className='text-xl font-semibold text-gray-600'>Your bag is empty</p>
                <Link to='/' className='btn-primary'>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-app-bg'>

            {/*BACK BUTTON*/}
            <div className='p-4 lg:p-6'>
                <button
                onClick={() => navigate(-1)}
                className='flex items-center gap-2 text-gray-600 hover: text-gray-900 text-sm font-medium'
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            <div className='max-w-sceen-xl mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-6'>

                {/*LEFT:ITEMS LIST*/}
                <div className='flex-1'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-4'>Check your Bag Items</h1>
                    <div className='flex flex-col gap-4'>
                        {items.map(item => (
                            //showControls=true so +/- buttons appear
                            <CartItem key={item.id} item={item} showcontrols={true} />
                        ))}
                    </div>
                </div>

                {/*RIGHT:BAG SUMMARY*/}
                <div className='lg:w-56 shrink-0'>
                    <div className='bg-white rounded-card shadow-sm p-4 sticky top-20'>

                        {/*Thumbnail grid- same as Sidebar*/}
                        <div className='grid grid-cols-3 gap-2 mb-4'>{items.slice(0,5).map(item => (
                            <div key={item.id} 
                            className='bg-gray-50 rounded-xl p-1 aspect-square flex items-center justify-center'>
                             <img src={item.image} alt={item.name}
                             className='w-full h-full obejct-contain' />
                             </div>
                        ))}
                    </div>
                        
                        {/*Bag Total*/}
                        <p className='text-sm text-subtle'>Bag Total</p>
                        <p className='text-xl font-bold text-gray-900 mb-4'>${total.toFixed(2)}</p>

                        {/*Checkout CTA*/}
                        <Link to='/checkout' className='btn-cta text-sm'>
                         <ShoppingBag size={16} />
                         Checkout
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default CartPage;