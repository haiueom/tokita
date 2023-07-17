"use client";

import { Role } from '@/types';
import {
    Text,
    Card,
    Grid,
    Col,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SingleRole({ id }: { id: string }) {
    const [role, setRole] = useState<Role>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getrole = async () => {
            try {
                const res = await fetch(`/api/role/${id}`);
                if (res.ok) {
                    setRole(await res.json());
                } else {
                    throw new Error("Failed to fetch role");
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        getrole();
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
                    <Text>ID: {role?.id}</Text>
                    <Text>Name: {role?.name}</Text>
                    <Text>Created At: {role?.createdAt}</Text>
                    <Text>Updated At: {role?.updatedAt}</Text>
                </Col>
            </Grid>
        </Card>
    );
}
