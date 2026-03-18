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
            <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{fontSize: '18px', fontweight: '600', color: '#374151' }}>Product not found</p>
                    <Link to='/' style={{color: '#2563EB', fontSize: '14px',marginTop: '8px', display: 'inline-block' }}>
                    Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const renderStars = (rating) =>
        Array.from({length:5}, (_,i) => (
            <Star 
            key={i}
            size={18}
            className={i < Math.floor(rating) ? 'text-yellow-400' :'text-gray-300'}
            fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
            />
         ));

    const handleAddToCart = () => {
        dispatch(addItem(product));
        navigate('/cart'); //go straight to cart after adding 
    };

    return (
        <div style={{minHeight: '100vh', backgroundColor: '#EDEDED' }}>

            {/*BACK BUTTON*/}
            <div style={{padding: '16px 24px'}}>
                <button 
                onClick={() => navigate (-1)}
                style={{display: 'flex', alignItems:'center', gap: '8px', color: '#6B7280', fontsize: '14px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer'}}
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>
    
    {/*PRODUCT CONTENT*/}
    <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px 48px', display: 'flex', flexWrap: 'wrap', gap: '32px'}}>
    
    {/*PRODUCT IMAGE*/}
    <div style={{flex: '1', minWidth: '280px', backgroundColor: 'white', borderRadius: '16px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '256px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}> 
        <img
        src={product.image}
        alt={product.name}
                style={{maxHeight: '256px', maxWidth: '100%', objectFit: 'contain'}}
                onError={(e) => {e.target.src ='https://placehold.co/300x300?text=No+Image';}}
        />
        </div>

        {/*PRODUCT INFORMATION*/}
        <div style={{flex: '1', minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
                <p style={{flex: '1', minWidth: '280px', display:'flex', flexDirection:'column', gap: '16px', fontSize: '14px', color: '#6B7280'}}>{product.variant}</p>
                <h1 style={{fontSize: '24px', fontWeight: '700', color: '#111827', marginTop:'4px'}}>{product.name}</h1>
                </div>

                {/*Stars*/}
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    {renderStars(product.rating)}
                    <span style={{fontSize: '14px', color: '#6B7280', marginLeft: '8px'}}>{product.rating} / 5</span>
                    </div>

                    <p style={{color:'#4B5563', fontSize:'14px', lineHeight: '1.6'}}>{product.description}</p>
                    <p style={{fontSize: '30px', fontWeight: '700', color: '#111827'}}>${product.price.toFixed(2)}</p>

                    {/*Add to Cart button*/}
                    <button 
                    onClick={handleAddToCart}
                    style={{backgroundColor: '#111827', color:'white', width:'100%', padding: '12px', borderRadius:'12px', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: 'none', cursor: 'pointer'}}
                    >
                        <ShoppingBag size={18} />
                        Add to Bag
                    </button>

                    {/*Back to Home*/}
                    <Link
                    to='/'
                    style={{textAlign:'center', color: '#2563EB', fontSize: '14px', marginTop: '4px'}}
                    >
                       ←Continue Shopping 
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail;