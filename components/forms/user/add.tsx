"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Role } from '@/types';

export default function AddUser() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await fetch('/api/role');
                if (res.ok) {
                    const data = await res.json();
                    setRoles(data);
                } else {
                    toast.error('API response was not ok');
                }
            } catch (e) {
                toast.error('Failed to fetch roles');
            }
        };
        fetchRoles();
    }, []);

    const handleForm = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
            role: { value: string };
        };
        if (target.role.value === "default") {
            setLoading(false);
            return toast.error('Please select a role');
        } 
        const body = {
            name: target.name.value,
            email: target.email.value,
            password: target.password.value,
            roleId: target.role.value,
        };
        const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Success creating new user');
            router.push('/admin/user');
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
                            placeholder="User Name"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="email" className="text-gray-600 font-medium">
                            email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="User Email"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="password" className="text-gray-600 font-medium">
                            password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Product Password"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        />
                    </Col>
                    <Col>
                        <label htmlFor="role" className="text-gray-600 font-medium">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            disabled={loading}
                            required
                            defaultValue="default"
                            className="form-select mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                        >
                            <option value="default" hidden>Select Role</option>
                            {roles.map((role: Role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
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