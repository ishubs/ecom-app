'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import { Button, List, InputNumber, Card } from 'antd';

export default function Cart() {
    const { items } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    const totalItems = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
    const totalPrice = items.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0).toFixed(2);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

            <div className="flex gap-4">
                <div className="w-2/3">
                    <List
                        className='mt-4'
                        dataSource={items}
                        renderItem={(item) => (
                            <Card>
                                <List.Item
                                    actions={[
                                        <InputNumber
                                            key="quantity"
                                            min={1}
                                            value={item.quantity}
                                            onChange={(value) => dispatch(updateQuantity({ id: item.id, quantity: value ?? 1 }))}
                                        />,
                                        <Button key="remove-cart" type="link" onClick={() => dispatch(removeFromCart(item.id))}>
                                            Remove
                                        </Button>,
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

                <Card className="w-1/3 shadow-md p-4">
                    <h3 className="text-lg font-semibold">Cart Summary</h3>
                    <p>Total Items: {totalItems}</p>
                    <p>Total Price: ${totalPrice}</p>
                    <Button type="primary" className="mt-2 w-full">Proceed to Checkout</Button>
                </Card>
            </div>
        </div>
    );
}
