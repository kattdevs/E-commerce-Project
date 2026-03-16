import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { selectCartItems } from '../store/cartSlice';

function BagSidebar() {
    const items = useSelector (selectCartItems);

    return (
        //hidden on mobile, flex column on large screens
        <aside className='hidden lg:flex flex-col gap-4 w-48 shrink-0'>
            <h2 className='text-xl font-bold text-gray-900'>Bag</h2>

            {/*THUMBNAILS GRID*/} 
            {items.length === 0 ? (
                <p className='text-sm text-subtle'>Your bag is empty.</p>
            ) : (
                <div className='grid grid-cols-3 gap-2'>
                    {/*Show up to 5 thumbnails then a '+more' title */}
                    {items.slice(0,5).map(item => (
                        <div
                         key={item.id}
                         className='bg-white rounded-xl p-1 aspect-sqaure flex items-center justify-center shadow-sm'
                         >
                            <img 
                            src={item.image}
                            alt={item.name}
                            className='w-full h-full object-contain'
                            />
                            </div>
                    ))}
                    {items.length > 5 && (
                        <div className='bg-gray-100 rounded-xl aspect-sqaure flex items-center justify-center text-xs text-subtle font-medium'>
                            +{items.length - 5}
                        </div>
                    )}
                    </div>
            )}

            {/*VIEW BAG BUTTON*/}
            <Link 
            to='/cart'
            className='btn-cta text-sm'
            >
                <ShoppingBag sixe={16} />
                View Bag
            </Link>
        </aside>
    );
}

export default BagSidebar;
