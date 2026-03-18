import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Gift, ChevronLeft } from 'lucide-react';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

const SHIPPING = 6.99;
const GST_RATE = 0.13;

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);

  const addressRaw = sessionStorage.getItem('shippingAddress');
  const paymentRaw = sessionStorage.getItem('paymentMethod');
  const address = addressRaw ? JSON.parse(addressRaw) : null;
  const payment = paymentRaw ? JSON.parse(paymentRaw) : null;

  const gst = subtotal * GST_RATE;
  const total = subtotal + SHIPPING + gst;

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    sessionStorage.removeItem('shippingAddress');
    sessionStorage.removeItem('paymentMethod');
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: '#4B5563', marginBottom: '16px' }}>Your bag is empty.</p>
          <Link to='/' style={{ backgroundColor: '#2563EB', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDEDED' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', display: 'flex', flexWrap: 'wrap', gap: '24px' }}>

        {/* LEFT COLUMN */}
        <div style={{ flex: 2, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* SHIPPING ADDRESS */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ fontWeight: '700', letterSpacing: '2px', color: '#1F2937', margin: 0 }}>SHIPPING ADDRESS</h2>
              <Link to='/add-address' style={{ border: '1px solid #D1D5DB', fontSize: '13px', padding: '4px 12px', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
                {address ? 'Change' : 'Add'}
              </Link>
            </div>
            {address ? (
              <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.8' }}>
                <p style={{ fontWeight: '600', margin: 0 }}>{address.name}</p>
                <p style={{ margin: 0 }}>{address.street}</p>
                <p style={{ margin: 0 }}>{address.city}, {address.state}</p>
                <p style={{ margin: 0 }}>{address.country}</p>
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>No address added yet.</p>
            )}
          </div>

          {/* PAYMENT METHOD */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h2 style={{ fontWeight: '700', letterSpacing: '2px', color: '#1F2937', margin: 0 }}>PAYMENT METHOD</h2>
              <Link to='/add-payment' style={{ border: '1px solid #D1D5DB', fontSize: '13px', padding: '4px 12px', borderRadius: '8px', textDecoration: 'none', color: '#374151' }}>
                {payment ? 'Change' : 'Add'}
              </Link>
            </div>
            {payment ? (
              <div style={{ fontSize: '14px', color: '#374151', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard size={16} color='#6B7280' />
                  <span>{payment.number}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Gift size={16} color='#6B7280' />
                  <span>$ 53.21 gift card balance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#22C55E', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>Billing address same as Shipping Address</span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>No payment method added yet.</p>
            )}
          </div>

          {/* REVIEW YOUR BAG */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontWeight: '700', letterSpacing: '2px', color: '#1F2937', marginBottom: '16px' }}>REVIEW YOUR BAG</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <CartItem key={item.id} item={item} showControls={false} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div style={{ width: '280px', minWidth: '260px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: '20px' }}>
            <h2 style={{ fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Items</span>
                <span>$ {subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>$ {SHIPPING.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated GST</span>
                <span>$ {gst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Gift Card</span>
                <span>$ 0.00</span>
              </div>
            </div>

            <hr style={{ margin: '12px 0', borderColor: '#F3F4F6' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '14px' }}>
              <span style={{ color: '#EF4444' }}>Order Total:</span>
              <span style={{ color: '#EF4444' }}>$ {total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={{ backgroundColor: '#111827', color: 'white', width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer', marginTop: '16px' }}
            >
              Place your order
            </button>

            <Link
              to='/cart'
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', fontSize: '14px', color: '#6B7280', textDecoration: 'none' }}
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