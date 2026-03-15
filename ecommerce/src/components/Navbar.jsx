import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
//Lucide React icons (these match the Figma icon style exactly)
import {ShoppingCart, Search, Menu, X} from 'lucide-react';
import { selectCartTotalQuantity } from '../store/cartSlice';

//Navbar receives two props:
//onMenuClick (called when the hamburger is clicked) (toggles sidebar)
//sidebarOpen (boolean so we can swap hamburger <-> icon)
function Navbar ({ onMenuClick, sidebarOpen}) {
    const navigate = useNavigate ();
    const [searchQuery, setSearchQuery] = useState ('');

//Get total cart quantity fromRedux for the badge 
const cartQuantity = useSelector (selectCartTotalQuantity);

//Handle search: when the user presses Enter, go to Home 
//with a query param so Home cabn filter products 
const handleSearch = (e) => {
    if (e.key ==='Enter' && searchQuery.trim ()) {
        navigate (`/?search=$ {encodeURIComponents(searchQuery.trim())}`);
}
};

return (
    //sticky top-0 keeps navbar visible when scrolling
    //z-50 puts it above the sidebar overlay
    <nav className='sticky top-0 z-50 bg-app-bg border-b border-gray-200'>
        <div className='max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4'>
    
    {/* HAMBURGER BUTTON (visible on all screens)*/}
    <button onClick={onMenuClick} className='p-2 rounded-lg hover:bg-gray-200 transition-colors'
    arial-label='Toggle menu'
    >
    {/*Show X when sidebar is open, hamburger Menu icon when closed*/}
    {sidebarOpen
    ? <X size={24} className='text-gray-700'/>
    :<Menu size={24} className='text-gray-700'/>}
    </button>
    {/*SEARCH BAR (grows to fill available space)*/}
    <div className='flex-1 relative'>
        {/*Search icon inside the input field (left side) */}
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
        />
        <input type='text' value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder='Apple Watch, Samsung S21, Macbook Pro,...'
        className='w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-600 placeholder-gray-400'
        />
        </div>

        {/*CART ICON with badge */}
        <Link to='/cart' className='relative p-2 rounded-lg hover:bg-gray-200 transition-colors'
        aria-label='View cart'
        >
            <ShoppingCart size={24} className='text-gray-700' />
            {/*Badge:only shown when cart has items */}
            {cartQuantity > 0 && (
                <span classname='absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                    {cartQuantity}
                    </span>
            )}
            </Link>
        </div>
    </nav>
);
}

export default Navbar;