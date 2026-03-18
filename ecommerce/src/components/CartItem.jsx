import { useDispatch } from "react-redux";
import { Star } from "lucide-react";
import { increaseQty, decreaseQty, removeItem } from '../store/cartSlice';


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
            fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
            color={i < Math.floor(rating) ? '#F59E0B' : '#D1D5DB'}
                />
            ));
        }
 return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px', display: 'flex', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        {/*PRODUCT IMAGE*/}
        <div style={{ width: '96px', height: '96px', flexShrink: 0, backgroundColor: '#F9FAFB', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
            src={item.image}
            alt={item.name}
           style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=?'; }}
            />
            </div>

            {/*PRODUCT INFORMATION*/}
            <div style={{flex: 1, minWidth:0}}>
                <p style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{item.name}</p>
                <p style={{ color: '#6B7280', fontSize: '13px', margin: '2px 0' }}>{item.variant}</p>
                <p style={{ color: '#6B7280', fontSize: '12px', margin: '4px 0', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {item.description}
        </p>

            {/*Stars + numeric rating */}
            <div style={{display:'flex', alignItems:'center', gap:'2px', margin:'6px 0'}}>
                {renderStars(item.rating)}
                <span style={{fontSize: '12px' , color: '#6B7280', marginLeft:'4px'}}>{item.rating} / 5</span>
                </div>
            
            {/*Price + quantity + controls */}
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: '8px'}}>
                <span style={{ fontWeight: '600', fontSize:'14px', color: '#111827'}}>
                    $ {item.price.toFixed(2)} x {item.qty}
                </span>
            
            {/* Quantity controls - only shown when showControls is true */}
            {showControls && (
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    {/*Decrease quantity or remove if quantity is 1 */}
                    <button
                    onClick={() => dispatch(decreaseQty(item.id)) }
                    style={{ width: '28px', height: '28px', borderRadius: '50%', border:'1px solid #D1D5DB', background: 'white', cursor: 'pointer', fontWeight:'bold', fontSize:'16px', display:'flex', alignItems: 'center', justifyContent:'center'}}
                    >
                      -  
                    </button>
                    <span style={{fontWeight: '600', minWidth:'16px', textAlign:'center'}}>{item.qty}</span>
                    <button 
                    onClick={() => dispatch(increaseQty(item.id))}
                     style={{ width: '28px', height: '28px', borderRadius: '50%', border:'1px solid #D1D5DB', background: 'white', cursor: 'pointer', fontWeight:'bold', fontSize:'16px', display:'flex', alignItems: 'center', justifyContent:'center'}}
                    >
                        +
                    </button>
                          <button
                onClick={() => dispatch(removeItem(item.id))}
                style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
              >
                ✕
              </button>
            </div>
          )}
            {/*Read-only quantity shown in Checkout review */}
            {!showControls && (
                <span style={{fontSize: '13px', color: '#6B7280'}}>Qty: {item.qty}</span>
            )}
            </div>
        </div>
    </div>
 );
}

export default CartItem;