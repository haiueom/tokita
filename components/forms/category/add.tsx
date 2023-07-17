"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddCategory() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
        };
        const body = {
            name: target.name.value,
        };
        const res = await fetch('/api/category', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Category added successfully');
            router.push('/admin/category');
        } else {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    return (
        <Card className='mt-6'>
            <form onSubmit={handleForm}>
                <Grid numItems={1} numItemsMd={2} className="gap-6">
                    <Col>
                        <label htmlFor="name" className="text-gray-600 font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Category Name"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className='flex gap-2 md:mt-4'>
                            <Button type='submit' loading={loading}>Submit</Button>
                            <Button type='reset' disabled={loading}>Reset</Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    )
}