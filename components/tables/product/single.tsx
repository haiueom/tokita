"use client";

import {
    Text,
    Card,
    Grid,
    Col,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product } from '@/types';

export default function SingleProduct({ id }: { id: string }) {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (res.ok) {
                    setProduct(await res.json());
                } else {
                    throw new Error("Failed to fetch product");
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        getProduct();
    }, [id]);

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
