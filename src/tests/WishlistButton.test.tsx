import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { WishlistButton } from '@/components/WishlistButton';

const mockStore = configureStore([]);
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

describe('WishlistButton', () => {
    it('should render and toggle wishlist', () => {
        const store = mockStore({ wishlist: { items: [] } });

        render(
            <Provider store={store}>
                <WishlistButton product={product} />
            </Provider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(store.getActions()).toEqual([{ type: 'wishlist/toggleWishlist', payload: product }]);
    });
});
