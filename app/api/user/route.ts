import prisma from '@/lib/prisma';
import { NewUserForm } from '@/types';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET(req: Request) {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(users, { status: 200 });
}

export async function POST(req: Request) {
    const data = await req.json();
    const body: NewUserForm = {
        name: data.name,
        email: data.email,
        password: await hash(data.password, 10),
        roleId: data.roleId,
    }

    try {
        const user = await prisma.user.create({
            data: body
        });

        return NextResponse.json(user, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}