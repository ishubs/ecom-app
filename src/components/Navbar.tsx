'use client';

import { Layout, Menu } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import WishlistBadge from './WishlistBadge';

const CartBadge = dynamic(() => import('./CartBadge'), { ssr: false });

const { Header } = Layout;

const menuItems = [
    {
        key: '1',
        label: <Link href="/">Home</Link>,
    },
    {
        key: '2',
        label: <CartBadge />,
    },
    {
        key: '3',
        label: <WishlistBadge />,
    }
];

export default function Navbar() {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                width: '100%',
                zIndex: 1,
                justifyContent: 'space-between',
            }}
        >
            <div className="demo-logo text-white">E-Commerce App</div>
            <div className='min-w-[200px]'>
                <Menu theme="dark" mode="horizontal" items={menuItems} className="bg-transparent border-none" />
            </div>
        </Header>
    );
}
