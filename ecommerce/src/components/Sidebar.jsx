import {NavLink} from 'react-router-dom';
import {Home, AlignJustify, Grid2X2, ShoppingBag, Camera} from 'lucid-react';

//Each sidebar item: which Lucide icon what label, and where it links 
const NAV_ITEMS = [
    {icon:Home,   label: 'Home',  to:'/'},
    {icon:AlignJustify,  label: 'Menu',  to:'/#menu'},
    {icon:Grid2X2,   label:'Store',  to:'/'},
    {icon:ShoppingBag,  label:'Bag',  to:'/cart'},
    {icon:Camera,  label:'Camera',  to:'/#camera'},
];

//isOpen (boolean passed from Home/parent to control mobile drawer)
//onClose (called when user clicks a link or the overlay to close drawer)
function Sidebar({isOpen, onClose}) {
    return(
        <>
        {/*MOBILE OVERLAY*/}
        {/*Dark semi-transparent backdrop behind drawer on small screens*/}
        {isOpen && (
            <div className='fixed inset-0 bg-black/40 z-30 lg:hidden'
            onClick={onClose} //clicking outside closes the drawer
            />
        )}

        {/* SIDEBAR PANEL*/}
        <aside className={`fixed top-0 left-0 h-full z-40 flex flex-col items-center pt-20 pb-6 gap-6 w-16 bg-white shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:shadow-none lg:border-r lg:border-gray-100`}
        >
        {/* NAV ITEMS */}
        {NAV_ITEMS.map (({ icon: Icon, label, to }) => (
            <NavLink
            key={label}
            to={to}
            onClick={onClose} //close drawer when a link is clicked on mobile
            className={ ({isActive}) =>
             `flex flex-col items-center gap-1 p-2 rounded-xl w-12
             ${isActive 
            ?' bg-primary text-white'
            :'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`
            }
            >
            {/*Icon (size 20 matches Figma */}
            <Icon size={20} />
            {/*Small label under the icon*/}
            <span className='text-[10px] font-medium leading-none'>
            {label}
            </span>
            </NavLink>
        ))}
            </aside>
            </>
        );
        }

 export default Sidebar;