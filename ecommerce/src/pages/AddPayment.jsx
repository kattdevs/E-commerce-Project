import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { CreditCard, Shield } from 'lucide-react';

//Demo saved cards 
const savedCards = [
    {id:1, label: 'MasterCard ending in 4242'},
    {id:2, label: 'VISA Debit ending in 2894'},
];

function AddPayment () {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);

    const [form, setForm] = useState({
        name:'',
        cardNumber: '',
        expiry: '',
        cvv: '',
        saveDefault: false,
    });
    const handleChange = (e) => {
        const {name,value,type,checked} = e.target;
        setForm(prev => ({
            ...prev,
            [name] : type ==='checkbox' ? checked : value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name] : '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim())  e.name = 'Cardholder name required';
        //Card number: must be exactly 16 digits (ignoring spaces/dashes)
        const digits = form.number.replace(/\D/g,'');
        if (digits.length !== 16) e.number = 'Enter a valid 16-digit card number';
        //Expiry: must match MM/YYYY
        if (!/^\d{3,4}$/.test(form.cvc)) e.cvv = 'Enter a valid 3 or 4-digit CVV';
        return e;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        //Save payment info to sessionStorage
        sessionStorage.setItem('paymentMethod', JSON.stringify({...form, 
            number: '**** **** **** ' + form.number.slice(-4),
        }));
        navigate('/checkout');
    };  
    returmnn (
        <div className='min-h-screen bg-app-bg flex items-center justify-center p-4'>
            <div className='w-full max-w-sm flex flex-col gap-4'>

                {/*SELECT A CARD*/}
                <div className='bg-white rounded-card shadow-sm p-5'>
                    <h2 className='text-lg font-bold tracking-widest text-gray-800 mb-3'>
                        SELECT A CARD
                    </h2>
                    {SAVED_CARDS.map(card => (
                        <label key={card.id}
                        className='flex items-center gap-3 py-2 cursor-pointer'
                        >
                            <input
                                type="radio"
                                name="selectedCard"
                                value={card.id}
                                checked={selectedCard === card.id}
                                onChange={() => setSelectedCard(card.id)}
                                className='accent-primary'
                                />
                                <CreditCard size={16} className='text-gray-500' />
                                <span className='text-sm text-gray-700'>{card.label}</span>
                        </label>
                    ))}
                </div>

                {/*ADD A NEW CARD*/}
                <div className='bg-white rounded-card shadow-sm p-5 flex flex-col gap-3'>
                    <h2 className='text-lg font-bold tracking-widest text-gray-800'>
                        ADD A NEW CARD
                    </h2>

                {/*Cardholder Name*/}
                <div>
                    <label className='text-xs text-subtle block mb-1'>Cardholder Name</label>
                    <input name='name' value={form.name} onChange={handleChange} placeholder='John Maker' className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                    {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name}</p>}
                </div>

                {/*Expiry + CVC side by side*/}
                <div className='flex gap-3'>
                    <div className='flex-1'>
                        <label className='text-xs text-subtle block mb-1'>Expiry Date</label>
                        <input name='expiry' value={form.expiry} onChange={handleChange} placeholder='MM/YYYY' className={`input-field ${errors.expiry ? 'border-red-400' : ''}`} />
                        {errors.expiry && <p className='text-red-500 text-xs mt-1'>{errors.expiry}</p>}
                    </div>
                    <div className='flex-1'>
                        <label className='text-xs text-subtle block mb-1'>CVC</label>
                        <input name='cvc' value={form.cvc} onChange={handleChange}
                         placeholder='123' maxLength={4}
                        className={`input-field ${errors.cvc ? 'border-red-400' : 
                        ''}`} />
                        {errors.cvc && <p className='text-red-500 text-xs mt-1'>{errors.cvc}</p>}
                    </div>
                </div>

                {/*Save as default checkbox*/}
                <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                    <input type='checkbox' name='saveDefault' checked={form.saveDefault} onChange={handleChange} className='accent-primary w-4 h-4' />
                    Save this as your default payment method
                </label>

                {/*Add Payment Method button*/}
                <button onClick={handleSubmit} className='btn-cta'>
                    <CreditCard size={16} />
                    Add Payment Method
                </button>

                <div className='flex items-center justify-between text-sm'>
                    <button onClick={() => navigate('/checkout')} className='text-gray-500 hover:text-gray-700'>
                        Back
                    </button>
                    <span className='flex items-center gap-1 text-green-600 text-xs'>
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

