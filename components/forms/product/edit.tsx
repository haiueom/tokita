'use client';

import { Card, Grid, Col, Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Category, Product } from '@/types';

export default function EditProduct({ id }: { id: string }) {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [image, setImage] = useState<string>();
    const [featured, setFeatured] = useState<boolean>(false);
    const [category, setCategory] = useState<string>("DEFAULT");

    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/category');
                if (res.ok) {
                    const data = await res.json();
                    setCategories(data);
                } else {
                    throw new Error('Failed to fetch categories');
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                if (res.ok) {
                    const data: Product = await res.json();
                    setProduct(data);
                    setImage(data?.image)
                    setFeatured(data?.isFeatured)
                    setCategory(data?.categoryId || "DEFAULT")
                } else {
                    throw new Error('Failed to fetch product');
                }
            } catch (error) {
                toast.error('Something went wrong');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const target = e.target as typeof e.target & {
                name: { value: string };
                description: { value: string };
                price: { value: number };
                stock: { value: number };
                image: { value: string };
                category: { value: string };
            };
            const body = {
                name: target.name.value,
                description: target.description.value,
                price: Number(target.price.value),
                stock: Number(target.stock.value),
                image: target.image.value,
                categoryId: target.category.value, 
                isFeatured: featured,
            };
            const res = await fetch(`/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (res.status === 201) {
                toast.success('Product updated successfully');
                router.push('/admin/product');
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value == "" ? setImage('https://via.placeholder.com/300x300') : setImage(e.target.value)
    }

    return (
        <Card className="mt-6">
            <form onSubmit={handleSubmit}>
                <Grid numItems={1} numItemsMd={2} className="gap-6">
                    <Col>
                        <label htmlFor="name" className="font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Product name"
                            defaultValue={product?.name}
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="description" className="font-medium text-gray-600">
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Product Description"
                            defaultValue={product?.description}
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="price" className="font-medium text-gray-600">
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="Product Price"
                            defaultValue={product?.price}
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="stock" className="font-medium text-gray-600">
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            placeholder="Product Stock"
                            defaultValue={product?.stock}
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
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        >
                            <option value="DEFAULT" hidden>
                                Select a category
                            </option>
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
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
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            disabled={loading}
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
                            defaultValue={product?.image}
                            onChange={(e) => handleImage(e)}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col numColSpan={1} numColSpanMd={2}>
                        <div className="flex gap-2 md:mt-4">
                            <Button type="submit" loading={loading}>Submit</Button>
                            <Button type="reset" loading={loading}>Reset</Button>
                        </div>
                    </Col>
                </Grid>
            </form>
        </Card>
    );
}
