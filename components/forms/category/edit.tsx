"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category } from '@/types';

export default function EditCategory({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`/api/category/${id}`);
                if (res.ok) {
                    setCategory(await res.json());
                } else {
                    throw new Error('Failed to fetch category');
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
        };
        const body = {
            name: target.name.value,
        };
        const res = await fetch(`/api/category/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Category updated successfully');
            router.push('/admin/category');
        } else {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    return (
        <Card className='mt-6'>
            <form onSubmit={handleForm}>
                <Grid numItems={1} numItemsMd={2} className='gap-6'>
                    <Col>
                        <label htmlFor='name' className='text-gray-600 font-medium'>
                            Name
                        </label>
                        <input
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Category Name'
                            defaultValue={category?.name}
                            disabled={loading}
                            required
                            className='form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400'
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className='flex gap-2 md:mt-4'>
                            <Button type='submit' loading={loading}>
                                Submit
                            </Button>
                            <Button type='reset' disabled={loading}>
                                Reset
                            </Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    );
}
