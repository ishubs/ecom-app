import { Badge } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Adjust path if needed

export default function WishlistBadge() {
    const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

    return (
        <Link className='px-2' href="/wishlist">
            <Badge count={wishlistCount} showZero offset={[10, 0]}>
                <span className="text-white">Wishlist</span>
            </Badge>
        </Link>
    );
}
