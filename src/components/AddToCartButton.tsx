"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { Button } from "antd";
import { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
    const dispatch = useDispatch();


    const cartItems = useSelector((state: RootState) => state.cart.items);

    const isInCart = cartItems.some((item) => item.id === product.id);

    const handleCartAction = () => {
        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
        }
    };

    return (
        <Button
            onClick={handleCartAction}
            className={`px-4 py-2 rounded mt-4 ${isInCart ? "bg-red-500" : "bg-blue-500"
                } text-white`}
        >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
    );
}
