"use client";

import { User } from '@/types';
import {
    Card,
    Title,
    Text,
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SingleUser({ id }: { id: string }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${id}`);
                if (res.ok) {
                    setUser(await res.json());
                } else {
                    throw new Error("Failed to fetch user");
                }
            } catch (e) {
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [id]);

    if (loading) {
        return (
            <Card className="mt-6 text-center">
                <Title>Loading...</Title>
            </Card>
        );
    }

    if (!user) {
        return (
            <Card className="mt-6 text-center">
                <Title>User not found</Title>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <Title>{user.name}</Title>
            <Text>Email: {user.email}</Text>
            <Text>Role: {user.role.name}</Text>
            <Text>Created At: {user.createdAt}</Text>
            <Text>Updated At: {user.updatedAt}</Text>
        </Card>
    );
}
