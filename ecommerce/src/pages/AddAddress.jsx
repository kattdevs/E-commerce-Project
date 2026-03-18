import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

function AddAddress() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    country: '',
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
    const newErrors = {};
    if (!form.name.trim())    newErrors.name    = 'Shipping name is required';
    if (!form.street.trim())  newErrors.street  = 'Street name is required';
    if (!form.city.trim())    newErrors.city    = 'City is required';
    if (!form.state.trim())   newErrors.state   = 'State / Province is required';
    if (!form.country.trim()) newErrors.country = 'Country is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    sessionStorage.setItem('shippingAddress', JSON.stringify(form));
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
      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Name */}
        <div>
          <label style={labelStyle}>Shipping Name</label>
          <input name='name' value={form.name} onChange={handleChange} placeholder='John Maker' style={inputStyle('name')} />
          {errors.name && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
        </div>

        {/* Street */}
        <div>
          <label style={labelStyle}>Street Name</label>
          <input name='street' value={form.street} onChange={handleChange} placeholder='123 Plae Grond Stret' style={inputStyle('street')} />
          {errors.street && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.street}</p>}
        </div>

        {/* City */}
        <div>
          <label style={labelStyle}>City</label>
          <input name='city' value={form.city} onChange={handleChange} placeholder='Vermont' style={inputStyle('city')} />
          {errors.city && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.city}</p>}
        </div>

        {/* State */}
        <div>
          <label style={labelStyle}>State / Province</label>
          <input name='state' value={form.state} onChange={handleChange} placeholder='California' style={inputStyle('state')} />
          {errors.state && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.state}</p>}
        </div>

        {/* Country */}
        <div>
          <label style={labelStyle}>Country</label>
          <input name='country' value={form.country} onChange={handleChange} placeholder='United States of America' style={inputStyle('country')} />
          {errors.country && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.country}</p>}
        </div>

        {/* Save as default */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
          <input type='checkbox' name='saveDefault' checked={form.saveDefault} onChange={handleChange} style={{ accentColor: '#2563EB', width: '16px', height: '16px' }} />
          Save this as your default address
        </label>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          style={{ backgroundColor: '#111827', color: 'white', width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '600', fontSize: '15px', border: 'none', cursor: 'pointer' }}
        >
          Add Address
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
  );
}

export default AddAddress;