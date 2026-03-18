import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {CreditCard, Gift, ChevronLeft} from 'lucide-react';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

//Flat shipping cost (matches Figma: $6.99)
const SHIPPING = 6.99;
//GST rate 13%
const GST_RATE = 0.13;

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotalPrice);

    //Read saved address and payment from sessionStorage
    //(saved by AddAddress and AddPayment forms)
    const addressRaw = sessionStorage.getItem('shippingAddress');
    const paymentRaw = sessionStorage.getItem('paymentMethod');
    const address = adressRaw ? JSON.parse (addressRaw) : null;
    const payment = paymentRaw ? JSON.parse (paymentRaw) : null;

    //Derived totals - computed, not hardcoded
    const gst = subtotal * GST_RATE;
    const total = subtotal + SHIPPING + gst;

    const handlePlaceOrder = () => {
        dispatch(clearCart()); //wipe Redux cart + localStorage 
        sessionStorage.removeItem('shippingAddress');
        sessionStorage.removeItem('paymentMethod');
        navigate('/order-success'); //go to confirmation page
    };

    if (items.length ===0) {
        return (
            <div className='min-h-screen bg-app-bg flex items-center justify-center'>
                <div className='text-center'>
                    <p className='text-lg font-semibold text-gray-600 mb-4'></p>
                    <Link to='/' className='btn-primary'>Shop Now</Link>
                    </div>
                </div>
        );
    }

    return (
        <div className='min-h-screen bg-app-bg'>
            <div className='max-w-screen-xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6'>

                {/*LEFT COLUMN*/}
                <div className='flex-1 flex flex-col gap-4'>

                    {/*SHIPPING ADDRESS*/}
                    <div className='bg-white rounded-card shadow-sm p-5'>
                        <div className='flex items-center justify-between mb-3'>
                            <h2 className='font-bold tracking-widest text-gray-800'></h2>
                            <Link to='/add-address'
                            className='border border-gray-300 text-sm px-3 py-1 rounded-lg hover:bg-gray-50'>
                                {address ? 'Change' : 'Add'}
                            </Link>
                        </div>
                        {address ? (
                            <div className='text-sm text-gray-700 space-y-0.5'>
                                <p className='font-semibold'>{adress.name}</p>
                                <p>{address.street}</p>
                                <p>{address.city}, {address.state}</p>
                                <p>{address.country}</p>
                            </div>
                    ) : ( 
                        <p className='text-sm text-subtle'>No address added yet.</p>
                    )}
                    </div>

                    {/*PAYMENT METHOD*/}
                    <div className='bg-white rounded-card shadow-sm p-5'>
                        <div className='flex items-center justify-between mb-3'>
                            <h2 className='font-bold tracking-widest text-gray-800'>
                                PAYMENT METHOD
                            </h2>
                            <Link to='/add-payment'
                            className='border border-gray-300 text-sm px-3 py-1 rounded-lg hover:bg-gray-50'>
                                {payment ? 'Change' : 'Add'}
                            </Link>
                        </div>
                        {payment ? (
                            <div className='text-sm text-gray-700 space-y-1'>
                                <div className='flex items-center gsp-2'>
                                    <CreditCard size={16} className='text-gray-500' />
                                    <span>{payment.number}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <Gift size={16} className='text-gray-500' />
                                        <span>$53.21 gift card balance</span>
                                        </div>
                                        <p className='flex items-center gap-1 text-xs text-subtle mt-1'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                        Billing address same as Shipping Address
                                        </p>
                                    </div>
                        ) : (
                            <p className='text-sm text-subtle'>No payment method added yet.</p>
                        )}
                        </div>

                        {/*REVIEW YOUR BAG*/}
                        <div className='bg-white rounded-card shadow-sm p-5'>
                            <h2 className='font-bold tracking-widest text-gray-800 mb-4'>
                                REVIEW YOUR BAG
                            </h2>
                            <div className='flex flex-col gap-4'>
                                {items.map(item => (
                                    //showControls=false: read-only in checkout review
                                    <CartItem key={item.id} item={item} showControls={false} />
                                ))}
                                </div>
                            </div>
                        </div>

                        {/*RIGHT COLUMN: ORDER SUMMARY */}
                        <div className='lg:w-64 shrink-0'>
                            <div className='bg-white rounded-card shadow-sm p-5 sticky top-20'>
                                <h2 className='font-semibold text-gray-800 mb-4'>Order Summary</h2>

                                <div className='flex flex-col gap-2 text-sm text-gray-700'>
                                    <div className='flex justify-between'>
                                        <span>Items</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Shipping</span>
                                            <span>${SHIPPING.toFixed(2)}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Estimated GST</span>
                                            <span>${gst.toFixed(2)}</span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <span>Gift Card</span>
                                                <span>$ 0.00</span>
                                            </div>
                                        </div>

                                        {/*Divider*/}
                                        <hr className='my-3 border-gray-100' />

                                        {/*Order Total */}
                                        <div className='flex justify-between font-bold text-sm'>
                                            <span className='text-order-red'>Ordet Total:</span>
                                            <span className='text-order-red'>{total.toFixed(2)}</span>
                                        </div>

                                        {/*Place your order CTA*/}
                                        <button
                                        onClick={handlePlaceOrder}
                                        className='btn-cta mt-4 text-sm'
                                        >
                                            Place your order
                                        </button>

                                        {/*Back Button*/}
                                        <Link 
                                        to='/cart'
                                        className='flex items-center justify-center gap mt-3 text-sm text-gray-500 hover:text-gray-700'
                                        >
                                            <ChevronLeft size={14} /> Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
    );
}

export default CheckoutPage;