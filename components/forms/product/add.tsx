"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category } from '@/types';

export default function AddProduct() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState('https://via.placeholder.com/300x300');
    const [categories, setCategories] = useState([]);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/category');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                } else {
                    toast.error('Failed to fetch categories');
                }
            } catch (error) {
                toast.error('Failed to fetch categories');
            }
        };
        fetchCategories();
    }, []);

    const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
            description: { value: string };
            price: { value: number };
            stock: { value: number };
            image: { value: string };
            category: { value: string };
        };
        if (target.category.value === "default") {
            setLoading(false);
            return toast.error('Please select a category');
        } 
        const body = {
            name: target.name.value,
            description: target.description.value,
            price: Number(target.price.value),
            stock: Number(target.stock.value),
            image: target.image.value,
            categoryId: target.category.value,
            isFeatured: isFeatured,
        };
        const res = await fetch('/api/product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Product added successfully');
            router.push('/admin/product');
        } else {
            toast.error('Something went wrong');
        }
        setLoading(false);
    };

    const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFeatured(e.target.checked);
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
                            placeholder="Product Name"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="description" className="text-gray-600 font-medium">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="price" className="text-gray-600 font-medium">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Product Price"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="stock" className="text-gray-600 font-medium">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Product Stock"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="category" className="text-gray-600 font-medium">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            disabled={loading}
                            required
                            defaultValue="default"
                            className="form-select mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        >
                            <option value="default" hidden>Select Category</option>
                            {categories.map((category: Category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col>
                        <label htmlFor="featured" className="text-gray-600 font-medium">
                            Featured
                        </label>
                        <div className="mt-1 px-3 py-2 flex flex-row">
                            <input
                                id="featured"
                                name="featured"
                                type="checkbox"
                                checked={isFeatured}
                                disabled={loading}
                                onChange={handleFeatured}
                                className="form-checkbox rounded-md border-gray-400"
                            />
                            <span className="ml-2 text-sm text-gray-500">Set as featured</span>
                        </div>
                    </Col>
                    <Col>
                        <label className="text-gray-600 font-medium">
                            Image Preview
                        </label>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={image} className="mt-1 rounded-md border-gray-400 max-w-xs w-full" alt="product"/>
                    </Col>
                    <Col>
                        <label htmlFor="image" className="text-gray-600 font-medium">
                            Image
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="string"
                            placeholder="Product Image"
                            disabled={loading}
                            onChange={(e) => e.target.value == "" ? setImage('https://via.placeholder.com/300x300') : setImage(e.target.value)}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className='flex gap-2 md:mt-4'>
                            <Button type='submit' loading={loading}>Submit</Button>
                            <Button type='reset' disabled={loading} onClick={() => setImage('https://via.placeholder.com/300x300')}>Reset</Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    )
}