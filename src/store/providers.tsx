'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export function Providers({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            store.dispatch({ type: 'cart/loadCart', payload: JSON.parse(savedCart) });
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}
