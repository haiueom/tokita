"use client";

import {
    Text,
    Card,
    Grid,
    Col,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export default function SingleTable({ id }: { id: string }) {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true); // Initialize loading state as true

    useEffect(() => {
        const getProduct = async () => {
            const item: Product = await fetch(`/api/product/${id}`).then((res) => res.json());
            setProduct(item);
            setLoading(false); // Set loading state to false when the data is fetched
        };
        getProduct();
    }, [id]); // Add 'id' as a dependency to useEffect to trigger the effect when the 'id' prop changes

    if (loading) {
        return (
            <Card className="mt-6 text-center">
                <Title>Loading...</Title>
            </Card>
        )
    }

    return (
        <Card className="mt-6">
            <Grid numItems={1} numItemsMd={2} className="gap-6">
                <Col>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product?.image} alt={product?.name} className="mt-2 mx-auto max-w-xs w-full" />
                </Col>
                <Col>
                    <Text className="text-2xl font-bold">{product?.name}</Text>
                    <Text className="text-lg">{product?.description}</Text>
                    <Text className="text-lg">Price: {product?.price}</Text>
                    <Text className="text-lg">Stock: {product?.stock}</Text>
                    <Text className="text-lg">Created At: {product?.createdAt}</Text>
                    <Text className="text-lg">Updated At: {product?.updatedAt}</Text>
                </Col>
            </Grid>
        </Card>
    );
}
