"use client";

import {
    Grid,
    Card,
    Title,
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
// import Image from "next/image";
import Currency from '@/components/ui/currency';
import { Product } from '@/types'
import { useRouter } from 'next/navigation';

export default function ProductCard() {
    const [product, setProduct] = useState<Product[]>();
    const [loading, setLoading] = useState(true);
    const [tableBody, setTableBody] = useState<JSX.Element[]>();

    const router = useRouter();

    function createRows() {
        const body = product?.map((i: Product) => (
            <Card key={i.id} className="space-y-4" onClick={(e) => router.push(`/product/${i.id}`)}>
                <div className="aspect-square rounded-xl bg-gray-100 relative">
                    {/* <Image 
                    src={i.image}
                    alt={i.name}
                    fill
                    className="aspect-square object-cover rounded-md"
                    /> */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                    src={i.image}
                    alt={i.name}
                    className="aspect-square object-cover rounded-md w-full h-full"
                    />
                </div>
                <div>
                    <p className="font-semibold text-lg">{i.name}</p>
                    <p className="truncate text-sm text-gray-500">{i.category.name}</p>
                </div>
                <div className="flex items-center justify-between">
                    <Currency value={i.price} />
                </div>
            </Card>
        ));
        setTableBody(body);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/product/featured');
                if (res.ok) {
                    setProduct(await res.json());
                    createRows();
                } else {
                    throw new Error("Failed to fetch products");
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    });

    if (loading) {
        return (
            <Card className="mt-6 text-center">
            <Title>Loading...</Title>
        </Card>
        );
    }

    return (
        <Grid numItems={1} numItemsSm={2} numItemsMd={3} numItemsLg={4} className="gap-4">
            {tableBody}
        </Grid>
    );
}
