"use client";

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Card,
    Title
} from '@tremor/react';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export default function AllTable() {
    const [product, setProduct] = useState<User[]>();
    const [loading, setLoading] = useState(false);
    const [tableBody, setTableBody] = useState<JSX.Element[]>();

    function createRows() {
        const body = product?.map((i: User) => (
            <TableRow key={i.id}>
                <TableCell><Text>{i.id}</Text></TableCell>
                <TableCell><Text>{i.name}</Text></TableCell>
                <TableCell><Text>{i.email}</Text></TableCell>
            </TableRow>
        ));
        setTableBody(body);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/user');
                if (res.ok) {
                    setProduct(await res.json());
                    createRows();
                } else {
                    throw new Error("Failed to fetch users");
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
        <Card className="mt-6">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableBody}</TableBody>
            </Table>
        </Card>
    );
}
