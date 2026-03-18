import {useLocation, useParams, useNavigate, Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import {Star, ArrowLeft, ShoppingBag} from "lucide-react";
import {addItem} from "../store/cartSlice";
import products from "../data/products";

function ProductDetail() {
    const {id} = useParams(); //get:id from the URL 
    const location = useLocations(); //read state passed by ProductCard
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Try location.state first (fastest - no search needed)
    //Fallback: find by id from the local products array
    const product = location.state?.product
    || products.find(p => p.id === Number(id));

    //Gaurd: if product not found at all, show an error
    if(!product){
        return(
            <div className='min-h-screen flex items-center justify-center bg-app-bg'>
                <div className='text-center'>
                    <p className='text-lg font-semibold text-gray-700'>Product not found.</p>
                    <Link to='/' className='text=primary text-sm mt-2 inline-block'>
                    Back to Home
                    </Link>
                    </div>/
                </div>
        );
    }

    const renderStars = (rating) =>
        Array.from({length:5}, (_,i) => (
            <Star key={i} size={18}
            className={i < Math.floor(rating) ? 'fill-star text-star' : 'text-gray-300' }
            />
        ));

    const handleAddToCart = () => {
        dispatch(addItem(product));
        navigate('/cart'); //go straight to cart after adding 
    };

    return (
        <div className='min-h-screen bg-app-bg'>

            {/*BACK BUTTON*/}
            <div className='p-4 lg:p-6'>
                <button 
                onClick={() => navigate (-1)}
                className='flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium'
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>
    
    {/*PRODUCT CONTENT*/}
    <div className='max-w-3xl mx-auto px-4 pb-12 flex flex-col md:flex-row gap-8'>
    
    {/*PRODUCT IMAGE*/}
    <div className='bg-white rounded-card shadow-sm p-8 flex-1 flex items-center justify-center min-h-64'>
        <img
        src={product.image}
        alt={product.name}
        className='max-h-64 max-w-full object-contain'
        />
        </div>

        {/*PRODUCT INFORMATION*/}
        <div className='flex-1 flex flex-col gap-4'>
            <div>
                <p className='text-subtle text-sm'>{product.variant}</p>
                <h1 className='text-2xl font-bold text-gray-900 mt-1'>{product.name}</h1>
                </div>

                {/*Stars*/}
                <div className='flex items-center gap-1'>
                    {renderStars(product.rating)}
                    <span className='text-sm text-subtle ml-2'>{product.rating}/5</span>
                    </div>

                    <p className='text-gray-600 text-sm leading-relaxed'>{product.description}</p>
                    <p className='text-3xl font-bold text-gray-900'>${product.price.toFixed(2)}</p>

                    {/*Add to Cart button*/}
                    <button 
                    onClick={handleAddToCart}
                    className='btn-cta'
                    >
                        <ShoppingBag size={18} />
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;