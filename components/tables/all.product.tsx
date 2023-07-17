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
import ViewBtn from '@/components/buttons/view.product';
import EditBtn from '@/components/buttons/edit.product';
import DeleteBtn from '@/components/buttons/delete.product';
import toast from 'react-hot-toast';

interface Product {
    id: string;
    name: string;
    email: string;
    price: number;
    stock: number;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export default function AllTable() {
    const [product, setProduct] = useState<Product[]>();
    const [loading, setLoading] = useState(false);
    const [tableBody, setTableBody] = useState<JSX.Element[]>();

    function createRows() {
        const body = product?.map((i: Product) => (
            <TableRow key={i.id}>
                <TableCell><Text>{i.id}</Text></TableCell>
                <TableCell><Text>{i.name}</Text></TableCell>
                <TableCell><Text>{i.price}</Text></TableCell>
                <TableCell><Text>{i.stock}</Text></TableCell>
                <TableCell className="flex gap-2">
                    <ViewBtn id={i.id} />
                    <EditBtn id={i.id} />
                    <DeleteBtn id={i.id} />
                </TableCell>
            </TableRow>
        ));
        setTableBody(body);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/product');
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
        <Card className="mt-6">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Stock</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableBody}</TableBody>
            </Table>
        </Card>
    );
}
