import ProductCard from './ProductCard';

//products (array from products.js)
//searchQuery - string typed in the Navbar search bar
function ProductList ({ products, searchQuery =''}) {
    //Filter products:match name OR variant
    const filtered = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
        p.variant.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    )
    :products; //no query (show all)

if (filtered.length === 0) {
    return(
        <div className='text-center text-subtle py-16'>
            <p className='text-lg font-medium'>No products found</p>
            <p className='text-sm mt-1'>Try a different search item.</p>
        </div>
    );
}

returnn (
    //Responsive grid:
    //1 column on mobile (grid-cols-1)
    //2 columns on medium screens (sm:grid-cols-2)
    //3 columns on large (lg:grid-cols-3)
    //4 columns on xl (xl:grid-cols-4)
    <div className='grid frid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
    );
}

export default ProductList;