import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield } from 'lucide-react';

const SAVED_CARDS = [
  { id: 1, label: 'MasterCard ending in 4242' },
  { id: 2, label: 'VISA Debit ending in 2894' },
];

function AddPayment() {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);

  const [form, setForm] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: '',
    saveDefault: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Cardholder name required';
    const digits = form.number.replace(/\D/g, '');
    if (digits.length !== 16) e.number = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{4}$/.test(form.expiry)) e.expiry = 'Use MM/YYYY format';
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = 'Enter a 3 or 4 digit CVC';
    return e;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    sessionStorage.setItem('paymentMethod', JSON.stringify({
      ...form,
      number: '**** **** **** ' + form.number.slice(-4),
    }));
    navigate('/checkout');
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    border: errors[fieldName] ? '1px solid #EF4444' : '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#F9FAFB',
    boxSizing: 'border-box',
  });

  const labelStyle = {
    fontSize: '12px',
    color: '#6B7280',
    display: 'block',
    marginBottom: '4px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* SELECT A CARD */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontWeight: '700', letterSpacing: '2px', color: '#1F2937', marginBottom: '12px', fontSize: '16px' }}>SELECT A CARD</h2>
          {SAVED_CARDS.map(card => (
            <label key={card.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', cursor: 'pointer' }}>
              <input
                type='radio'
                name='savedCard'
                value={card.id}
                checked={selectedCard === card.id}
                onChange={() => setSelectedCard(card.id)}
                style={{ accentColor: '#2563EB' }}
              />
              <CreditCard size={16} color='#6B7280' />
              <span style={{ fontSize: '14px', color: '#374151' }}>{card.label}</span>
            </label>
          ))}
        </div>

        {/* ADD A NEW CARD */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontWeight: '700', letterSpacing: '2px', color: '#1F2937', fontSize: '16px', margin: 0 }}>ADD A NEW CARD</h2>

          {/* Cardholder Name */}
          <div>
            <label style={labelStyle}>Cardholder Name</label>
            <input name='name' value={form.name} onChange={handleChange} placeholder='John Maker' style={inputStyle('name')} />
            {errors.name && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          {/* Card Number */}
          <div>
            <label style={labelStyle}>Card Number</label>
            <input name='number' value={form.number} onChange={handleChange} placeholder='5126-5987-2214-7621' maxLength={19} style={inputStyle('number')} />
            {errors.number && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.number}</p>}
          </div>

          {/* Expiry + CVC */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Expiry Date</label>
              <input name='expiry' value={form.expiry} onChange={handleChange} placeholder='MM/YYYY' style={inputStyle('expiry')} />
              {errors.expiry && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.expiry}</p>}
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>CVC</label>
              <input name='cvc' value={form.cvc} onChange={handleChange} placeholder='123' maxLength={4} style={inputStyle('cvc')} />
              {errors.cvc && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.cvc}</p>}
            </div>
          </div>

          {/* Save as default */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
            <input type='checkbox' name='saveDefault' checked={form.saveDefault} onChange={handleChange} style={{ accentColor: '#2563EB', width: '16px', height: '16px' }} />
            Save this as your default payment method
          </label>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{ backgroundColor: '#111827', color: 'white', width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            <CreditCard size={16} />
            Add Payment Method
          </button>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
            <button onClick={() => navigate('/checkout')} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
              Back
            </button>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16A34A', fontSize: '12px' }}>
              <Shield size={12} />
              Secure Connection
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddPayment;

