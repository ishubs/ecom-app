


'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Card, Pagination, Select, Spin, Tag, AutoComplete, Image } from 'antd';
import Link from 'next/link';
import { useGetProductsQuery } from '@/services/productsApi';
import { debounce } from 'lodash';
import { WishlistButton } from './WishlistButton';

const { Meta } = Card;
const { Option } = Select;

export default function ProductList() {
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const { data: products, isLoading, isError } = useGetProductsQuery({ page });

    const categories = useMemo(() => {
        const allCategories = products?.flatMap(product => product.categories) || [];
        return ['all', ...new Set(allCategories)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return selectedCategory === 'all'
            ? products
            : products?.filter(product => product.categories.includes(selectedCategory));
    }, [products, selectedCategory]);

    const sortedProducts = useMemo(() => {
        return [...(filteredProducts || [])].sort((a, b) =>
            sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
    }, [filteredProducts, sortOrder]);
    const fetchSearchResults = useMemo(() => debounce(async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }
        setLoadingSearch(true);

        if (searchAbortController.current) {
            searchAbortController.current.abort();
        }

        const controller = new AbortController();
        searchAbortController.current = controller;

        try {
            const response = await fetch(`https://fakerapi.it/api/v2/products?name=${query}`, {
                signal: controller.signal,
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setSearchResults(data?.data || []);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Search API error:', error);
            }
        } finally {
            setLoadingSearch(false);
        }
    }, 500), []);

    const handleSearch = (value) => {
        setSearchQuery(value);
        fetchSearchResults(value);
    };

    // Store the AbortController ref
    const searchAbortController = useRef<AbortController | null>(null);


    useEffect(() => {
        fetchSearchResults(searchQuery);
    }, [fetchSearchResults, searchQuery]);

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Spin /></div>;
    if (isError) return <div>Error loading products</div>;

    return (
        <div className="p-4">
            <div className="sticky top-20 bg-white z-10 p-4 shadow-md flex justify-between items-center mb-4">

                <Select value={sortOrder} onChange={setSortOrder} style={{ width: 150 }}>
                    <Option value="asc">Price: Low to High</Option>
                    <Option value="desc">Price: High to Low</Option>
                </Select>
                <AutoComplete
                    value={searchQuery}
                    onChange={handleSearch}  // Instead of setSearchQuery
                    style={{ width: 300 }}
                    options={searchResults.map((product) => ({
                        value: product.name,
                        label: (
                            <Link href={`/products/${product.id}`}>
                                <div>
                                    {product.name}
                                </div>
                            </Link>
                        ),

                    }))}
                    placeholder="Search for products..."
                    allowClear
                    loading={loadingSearch}
                />
                <Select value={selectedCategory} onChange={(value) => setSelectedCategory(value === 'all' ? 'all' : Number(value))} style={{ width: 150 }}>
                    {categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                    ))}
                </Select>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
                {sortedProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <Card
                            hoverable

                            style={{ height: '100%' }}
                            cover={<Image alt={product.name} src={product.images[0]?.url} />}
                            className="flex flex-col"
                        >
                            <Meta title={product.name} />
                            <p className="mt-2">Price: ${product.price}</p>
                            <div className="mt-2 gap-1 flex flex-wrap">
                                {product.tags.map((tag, index) => (
                                    <Tag key={`${tag}-${index}`} color="blue">{tag}</Tag>
                                ))}
                            </div>
                            <WishlistButton product={product} />
                        </Card>
                    </Link>
                ))}
            </div>
            <Pagination
                current={page}
                total={50}
                onChange={setPage}
                className="mt-4 flex justify-center"
            />
        </div>
    );
}
