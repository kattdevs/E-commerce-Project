import {useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProductList from '../components/ProductList';
import BagSidebar from '../components/BagSidebar';
import products from '../data/products';

function Home () {
    //sidebarOpen, controls the mobile drawer
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //use SearchParams reads ?search=...from the URL
    //This is set by the Navbar when user presses Enter in the search box
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    return(
        //Full screen height, flex column so Navbar stays at the top
        <div className='min-h-screen flex flex-col bg-app-bg'>

            {/*NAVBAR*/}
            <Navbar 
            onMenuClick={() => setSidebarOpen(prev => !prev)}
            />

            {/*MAIN CONTENT AREA*/}
            {/*flex-1 makes this area grow to fill remaining height*/}
            <div className='flex flex-1 overflow-hidden'>

                {/*SIDEBAR (left strip)*/}
                <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                />

                {/*PRODUCT GRID (centre,scrollable*/}
                <main className='flex-1 overflow-y-auto p-4 lg:p-6'>
                    {/*Show search banner if a query is active*/}
                    {searchQuery && (
                        <p className='text-sm text-subtle mb-4'>Showing results for:<strong>{searchQuery}</strong></p>
                    )}
                    <ProductList products={products} searchQuery={searchQuery} />
                    </main>

                    {/*BAG SIDEBAR (right, desktop only)*/}
                    <div className='p-4 lg:p-6'>
                        <BagSidebar/>
                    </div>
                </div>
                </div>
             );
}

export default Home;