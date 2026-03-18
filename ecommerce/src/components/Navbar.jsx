import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
//Lucide React icons (these match the Figma icon style exactly)
import {ShoppingCart, Search, Menu, X} from 'lucide-react';
import { selectCartTotalQty } from '../store/cartSlice';

//Navbar receives two props:
//onMenuClick (called when the hamburger is clicked) (toggles sidebar)
//sidebarOpen (boolean so we can swap hamburger <-> icon)
function Navbar ({ onMenuClick, sidebarOpen}) {
    const navigate = useNavigate ();
    const [searchQuery, setSearchQuery] = useState ('');

//Get total cart quantity fromRedux for the badge 
const cartQuantity = useSelector (selectCartTotalQty);

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
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#EDEDED', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    
    {/* HAMBURGER BUTTON (visible on all screens)*/}
    <button onClick={onMenuClick} 
     style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'none', cursor: 'pointer' }}
          aria-label='Toggle menu'
    >
    {/*Show X when sidebar is open, hamburger Menu icon when closed*/}
    {sidebarOpen
    ? <X size={24} color='#374151' />
    :<Menu size={24} color='#374151' />}
    </button>
    {/*SEARCH BAR (grows to fill available space)*/}
    <div style={{ flex: 1, position: 'relative' }}>
        {/*Search icon inside the input field (left side) */}
        <Search size={16} color='#9CA3AF' style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input type='text' value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder='Apple Watch, Samsung S21, Macbook Pro,...'
        style={{ width: '100%', paddingLeft: '36px', paddingRight: '16px', paddingTop: '8px', paddingBottom: '8px', borderRadius: '12px', border: '1px solid #E5E7EB', backgroundColor: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', color: '#374151' }}
        />
        </div>

        {/*CART ICON with badge */}
        <Link to='/cart' 
        style={{ position: 'relative', padding: '8px', borderRadius: '8px', display: 'flex' }}
        aria-label='View cart'
        >
            <ShoppingCart size={24} color='#374151' />
            {/*Badge:only shown when cart has items */}
            {cartQuantity > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#2563EB', color: 'white', fontSize: '11px', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cartQty}
                    </span>
            )}
            </Link>
        </div>
    </nav>
);
}

export default Navbar;