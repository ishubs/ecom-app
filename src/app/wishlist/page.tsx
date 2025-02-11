'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleWishlist } from '@/store/wishlistSlice';
import { Button, List, Card } from 'antd';
import Link from 'next/link';

export default function Wishlist() {
    const { items } = useSelector((state: RootState) => state.wishlist);
    const dispatch = useDispatch();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>

            <div className="w-full">
                <List
                    className='mt-4'
                    dataSource={items}
                    renderItem={(item) => (
                        <Card>
                            <List.Item
                                actions={[
                                    <Button key={`remove-${item.id}`} type="link" onClick={() => dispatch(toggleWishlist(item))}>
                                        Remove
                                    </Button>,
                                    <Link key={`view-product`} href={`/products/${item.id}`}>
                                        <Button type="primary">View Product</Button>
                                    </Link>,
                                ]}
                            >
                                <List.Item.Meta
                                    title={item.name}
                                    description={
                                        <>
                                            <p>Price: ${item.price}</p>
                                            <p>Categories: {item.categories.join(', ')}</p>
                                            <p>Tags: {item.tags.join(', ')}</p>
                                        </>
                                    }
                                />
                            </List.Item>
                        </Card>
                    )}
                />
            </div>
        </div>
    );
}
