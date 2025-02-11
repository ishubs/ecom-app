import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface WishlistState {
    items: Product[]; 
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            const existingIndex = state.items.findIndex(item => item.id === product.id);

            if (existingIndex !== -1) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push(product);
            }
        },
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
