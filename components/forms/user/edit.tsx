"use client";

import { Card, Grid, Col, Button } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Role, EditUserForm } from '@/types';

export default function EditUser({ id }: { id: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState<Role[]>([]);
    const [user, setUser] = useState<EditUserForm>();
    const [role, setRole] = useState<string>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                    setRole(data.roleId);
                } else {
                    toast.error('API response was not ok');
                }
            } catch (e) {
                toast.error('Failed to fetch user');
            }
        };
        fetchUser();
    }, []);

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

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
        };
        const body = {
            name: target.name.value,
            email: target.email.value,
            roleId: role,
        };
        const res = await fetch(`/api/user/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (res.status === 201) {
            toast.success('Success updating user');
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
                            defaultValue={user?.name}
                        />
                    </Col>
                    <Col>
                        <label htmlFor="email" className="text-gray-600 font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="User Email"
                            disabled={loading}
                            required
                            className="form-input mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                            defaultValue={user?.email}
                        />
                    </Col>
                    <Col>
                        <label htmlFor="role" className="text-gray-600 font-medium">
                            Role
                        </label>
                        <select
                            id="roleId"
                            name="roleId"
                            disabled={loading}
                            required
                            className="form-select mt-1 w-full rounded-md border-gray-400 px-3 py-2 placeholder-gray-400"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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