import {Link} from 'react-router-dom';
import { Check, CheckCircle } from 'lucide-react';

function OrderSuccess() {
    return (
        <div className='min-h-screen bg-app-bg flex items-center justify-center p-4'>
            <div className='bg-white rounded-card shadow-sm p-10 text-center max-w-md w-full flex-col items-center gap-4'>

                {/*Large green tick icon*/}
                <CheckCircle size={80} className='text-green-500' />

                <h1 className='text-2xl font-bold text-gray-900'>Order Successful!</h1>
                <p className='text-gray-500 text-sm'>Thank you for your purchase. Your order has been placed and will be delivered soon.</p>

                {/*Simulated order number*/}
                <p className='text-xs text-subtle'>
                    Order #ORD-{Math.floor(Math.random() * 900000 + 100000)}
                </p>

                {/*Back to home button*/}
                <Link to='/' className='btn-cta mt-4 w-full text-sm'>
                Continue Shopping
                </Link>
            </div>
        </div>
    );
}
export default OrderSuccess;