"use client";

import { Category } from '@/types';
import {
    Text,
    Card,
    Grid,
    Col,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SingleCategory({ id }: { id: string }) {
    const [category, setCategory] = useState<Category>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await fetch(`/api/category/${id}`);
                if (res.ok) {
                    setCategory(await res.json());
                } else {
                    throw new Error("Failed to fetch category");
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        getCategory();
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
                    <Text className="text-2xl font-bold">ID: {category?.id}</Text>
                    <Text className="text-2xl font-bold">Name: {category?.name}</Text>
                    <Text className="text-lg">Created At: {category?.createdAt}</Text>
                    <Text className="text-lg">Updated At: {category?.updatedAt}</Text>
                </Col>
            </Grid>
        </Card>
    );
}
