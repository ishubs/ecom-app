import wishlistReducer, { toggleWishlist } from '@/store/wishlistSlice';

const product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    categories: [1],
    tags: ['Tag1'],
    description: 'A sample product description.',
    ean: '1234567890123',
    upc: '123456789012',
    image: 'https://via.placeholder.com/150',
    images: [],
    net_price: 0,
    taxes: 0
};
describe('wishlistSlice', () => {
    it('should add product to wishlist when toggled', () => {
        const initialState = { items: [] };
        const newState = wishlistReducer(initialState, toggleWishlist(product));

        expect(newState.items).toContainEqual(product);
    });

    it('should remove product from wishlist when toggled again', () => {
        const initialState = { items: [product] };
        const newState = wishlistReducer(initialState, toggleWishlist(product));

        expect(newState.items).not.toContainEqual(product);
    });
});
