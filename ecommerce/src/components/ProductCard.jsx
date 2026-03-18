import { useNavigate } from 'react-router-dom';
import { useDispatch,useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { addItem } from '../store/cartSlice';

//product (the full product object from product.js 
function ProductCard ({ product }) {
    const navigate = useNavigate ();
    const dispatch = useDispatch ();

    //Navigate to the product detail page 
    //We pass the product object via location.state so ProductDetail
    //can display data without making a network request
    const handleCardClick = () => {
        navigate (`/product/$product.id}`, {state: {product} });
    };

    //Add to cart WITHOUT navigating away from the current page 
    //e.stopPropagation() prevents the card click from also firing 
    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addItem(product));
    };

    return (
        <div 
        onClick={handleCardClick}
        className='bg-white rounded-card shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col gap-2'
        >
            {/*PRODUCT IMAGE*/}
            {/*object-contain keeps the image's aspect ratio inside a fired box*/}
            <div className='h-36 flex items-center justify-center bg-gray-50 rounded-xl'>
                <img 
                src={product.image}
                alt={`${product.name} ${product.variant}`}
                className='h-full w-full object-contain'
                //Fallback: if image fails to load, show a gray placeholder
                onError={(e) => {e.target.src ='/images/placeholder.png';}}
                />
                </div>
            {/*NAME + VARIANT */}
            <div>
                <p className='font-semibold text-gray-900 text-sm'>{product.name}</p>
                < p className='text-subtle text-xs'>{product.variant}</p>
                </div>
            
            {/*PRICE + ADD BUTTON*/}
            <div className='flex items-center justify-between mt-auto'>
                <span className='font-bold text-gray-900 text-sm'>
                    $ {product.price.toFixed(2)}
                </span>
            {/*Black add-to-cart button (matches Figma icon button*/}
            <button
            onClick={handleAddToCart}
            className='bg-cta text-white p-2 rounded-lg hover:bg-gray-700 transition-colors'
            aria-label={`Add ${product.name} to cart`}
            >
                <ShoppingBag size={16} />
            </button>
        </div>
    </div>
    );
}

export default ProductCard;