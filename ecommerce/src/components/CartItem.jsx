import { useDispatch } from "react-redux";
import { Star } from "lucide-react";
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice';
import { defaults } from "autoprefixer";

//item - a cart item (product fileds + quantity)
//showControls - if true, shows =/- buttons (CartPage)
//if false, shows quantity as read-only text (CheckoutPage)
function CartItem({ item, showControls = true }) {
    const dispatch = useDispatch();

    //Render a row of filled/half/empty stars based on rating
    const renderStars = (rating) => {
        return Array.from ({ length:5}, (_,i) => (
            <Star 
            key={i}
            size={14}
            //Fill star if index is less than rating, else outline
            className={i<Math.floor(rating)
                ? 'fill-star text-star'
                : 'text-gray-300'}
                />
            ));
        };

 return (
    <div className='bg-white rounded-card p-4 flex gap-4'>

        {/*PRODUCT IMAGE*/}
        <div className='w-24 h-24 shrink-0 bg-gray-50 rounded-xl flex items-center justify-center'>
            <img
            src={item.image}
            alt={item.name}
            className='w-full h-full object-contain'
            />
            </div>

            {/*PRODUCT INFORMATION*/}
            <div className='flex-1 min-w-0'>
                <p className='font-semibold text-gray-900'>{item.name}</p>
                <p className='text-subtle text-sm'>{item.variant}</p>
                <p className='text-subtle text-xs mt-1 line-clamp-2'>{item.description}</p>

            {/*Stars + numeric rating */}
            <div className='flex items-center gap-1 mt-2'>
                {renderStars(item.rating)}
                <span className='text-xs text-subtle ml-1'>{item.rating} / 5</span>
                </div>
            
            {/*Price + quantity + controls */}
            <div className='flex items-center justify-between mt-3'>
                <span className='font-semibold text-sm text-gray-900'>
                    $ {item.price.toFixed(2)} x {item.quanity}
                </span>
            
            {/* Quantity controls - only shown when showControls is true */}
            {showControls && (
                <div className='flex items-center gap-3'>
                    {/*Decrease quantity or remove if quantity is 1 */}
                    <button
                    onClick={() => dispatch(decreaseQuantity(item.id)) }
                    className='w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg'
                    aria-label='Decrease quantity'
                    >
                      -  
                    </button>
                    <span className='font-semibold w-4 text-center'>{item.quantity}</span>
                    <button 
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className='w-7 h-7 rounded-full border border-gray-300 hover:bg-gray-100 font-bold text-lg'
                    aria-label='Increase quantity'
                    >
                        +
                    </button>
                </div>
            )}

            {/*Read-only quantity shown in Checkout review */}
            {!showControls && (
                <span className='text-sm text-subtle'> Quantity: {item.quanity}</span>
            )}
            </div>
        </div>
    </div>
 );
}

export default CartItem;