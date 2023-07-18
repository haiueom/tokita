/* eslint-disable @next/next/no-img-element */
"use client";

import {
    Card,
    Grid,
    Col,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product } from '@/types';
import Currency from '@/components/ui/currency';
import OrderBtn from '@/components/buttons/order';

export default function ProductDetail({ id }: { id: string }) {
    const [product, setProduct] = useState<Product>({
        id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        image: '',
        category: {
            id: '',
            name: '',
            products: [],
            createdAt: '',
            updatedAt: '',
        },
        categoryId: '',
        isFeatured: false,
        createdAt: '',
        updatedAt: '',
    });
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
                <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-square object-cover object-center rounded-md w-full h-full"
                    />
                </div>
                <Col>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <div className="mt-3 flex items-end justify-between">
                        <p className="text-2xl text-gray-900">
                        <Currency value={product.price} />
                        </p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col gap-y-6">
                        {product.description && (
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Description</h2>
                                {product.description}
                            </div>
                        )}
                    </div>
                    <div className="mt-10 flex items-center gap-x-3">
                        <OrderBtn text='Order' product={product} />
                    </div>
                </Col>
            </Grid>
        </Card>
    );
}
