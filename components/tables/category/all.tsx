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
import ViewBtn from '@/components/buttons/view';
import EditBtn from '@/components/buttons/edit';
import DeleteBtn from '@/components/buttons/delete';
import toast from 'react-hot-toast';
import { Category } from '@/types';

export default function AllCategory() {
    const [category, setCategory] = useState<Category[]>();
    const [loading, setLoading] = useState(true);
    const [tableBody, setTableBody] = useState<JSX.Element[]>();

    function createRows() {
        const body = category?.map((i: Category) => (
            <TableRow key={i.id}>
                <TableCell><Text>{i.id}</Text></TableCell>
                <TableCell><Text>{i.name}</Text></TableCell>
                <TableCell className="flex gap-2">
                    <ViewBtn id={i.id} type="category" />
                    <EditBtn id={i.id} type="category" />
                    <DeleteBtn id={i.id} type="category" />
                </TableCell>
            </TableRow>
        ));
        setTableBody(body);
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/category');
                if (res.ok) {
                    setCategory(await res.json());
                    createRows();
                } else {
                    throw new Error("Failed to fetch categories");
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
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>{tableBody}</TableBody>
            </Table>
        </Card>
    );
}
