import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleWishlist } from '@/store/wishlistSlice';
import { Button } from 'antd';
import { Product } from '@/types';

export const WishlistButton = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);
    console.log(wishlist)
    const isWishlisted = wishlist.some((item) => item.id === product.id);
    console.log(isWishlisted)
    return (
        <Button
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                dispatch(toggleWishlist(product));
            }}
            className='absolute top-0 right-0'
        >
            {isWishlisted ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
        </Button>
    );
};
