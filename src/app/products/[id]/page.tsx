import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/types";
import { Image } from "antd";

type ParamsPromise = Promise<{ id: string }>;

export default async function ProductDetailPage(props: { params: ParamsPromise }) {
    const { id } = await props.params; // Awaiting params
    const res = await fetch("https://fakerapi.it/api/v2/products?_quantity=100", { cache: "no-store" });
    const data = await res.json();

    const product = data?.data.find((p: Product) => p.id === Number(id));

    if (!product) return <div>Product not found</div>;

    return (
        <div className="p-4">
            <h1 className="mt-16">{product.name}</h1>
            <Image src={product.images[0]?.url} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <AddToCartButton product={product} />
        </div>
    );
}
