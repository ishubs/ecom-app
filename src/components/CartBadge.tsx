'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Badge } from 'antd';
import Link from 'next/link';

export default function CartBadge() {
    const { items } = useSelector((state: RootState) => state.cart);
    const cartCount = items.length;

    return (
        <Link className='px-2' href="/cart">
            <Badge count={cartCount} offset={[10, 0]}>
                <span className="text-white">Cart</span>
            </Badge>
        </Link>
    );
}
