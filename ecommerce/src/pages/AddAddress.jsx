import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { LucideChartNoAxesCombined, Shield } from 'lucide-react';
 
function AddAddress () {
    const navigate = useNvaigate();

    //Controlled from state: one key per field 
    const [from, setForm] =useState ({
        name: '',
        street:',',
        city: '',
        state: '',
        country:'',
        saveDefault: false,
    });

    //Validation errors: same keys as form 
    const [errors, setErrors] = useState({});

    //Generic change handler: works for both text inputs and checkbox
    const handleChange = (e) => {
        const {name,value,type,checked} = e.target;
        setForm(prev => ({
            ...prev,
            [name] : type ==='checkbox' ? checked : value 
        }));
        //Clear error for this field when user starts typing
        if (errors[name]) setErrors(prev => ({ ...prev, [name] : '' }));
    };
    //Validate all text fields are non-empty
    const validate = () => {
        const newErrors = {};
        if (!form.name.trim())  newErrors.name = 'Shipping name is required';
        if (!form.street.trim()) newErrors.street = 'Street name is required';
        if (!form.city.trim()) newErrors.city = 'City is required';
        if (!form.state.trim()) newErrors.state = 'State/ Provide is required';
        if (!form.country.trim()) newErrors.country = 'Country is required';
        return newErrors;
    };

    const handleSubmit = () => {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); //show errors under each field
            return;
        }
        //Save address to sessionStorage so Checkout can read it
        sessionStorage.setItem('shippingAddress', JSON.stringify(form));
        navigate('/checkout'); //go to checkout after saving address
    };

    //Helper: renders a labelled input field with error message
    const Field = ({label, name, placeholder}) => (
        <div >
            <label className='text-xs text-subtle block mb-1'>{label}</label>
            <input
                name={name}
                value={form[name]}
                 onChange={handleChange}
                placeholder={placeholder}
                className={`imput-field ${errors[name] ? border-red-400 : ''}`}
            />
            {errors[name] && <p className='text-red-500 text-xs mt-1'>{errors[name]}</p>}
        </div>
    );

    return (
        <div className='min-h-screen bg-app-bg flex items-center justify-center p-4'>
            <div className='bg-white rounded-card shadow-sm p-6 w-full max-w-sm 
            flex flex-col gap-4'>

            {/*Fields mathcing Figma Add-adress form */}
            <Field label='Name' name='name' placeholder='John Maker' />
            <Field label='Street' name='street' placeholder='123 Plae Grond Stret' />
            <Field label='City' name='city' placeholder='Vermont' />
            <Field label='State/ Province' name='state' placeholder='California' />
            <Field label='Country' name='country' placeholder='United States of America' />

            {/*Save as default checkbox */}
            <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                <input type='checkbox' 
                name='saveDefault' 
                checked={form.saveDefault} 
                onChange={handleChange} 
                className='accent-primary w-4 h-4'
                />
                Save this as your default address
            </label>

            {/*Add Address button */}
            <button onClick={handleSubmit} className='btn-cta'>
                Add Address
            </button>

            {/*Footer: Back link + Secure Connection */}
            <div className='flex items-center justify-between text-sm'>
                <button onClick={() => navigate ('checkout')}
                className='text-gray-500 hover:text-gray-700'
                >
                    Back
                </button>
                <span className='flex items-center gap-1 text-green-600 text-xs'>
                    <Shield size={12} />
                    Secure Connection
                </span>
            </div>
            </div>
        </div>
    );
}
export default AddAddress;