import prisma from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { NewUserForm } from '@/types';

export async function POST(req: Request) {
    const { email, password } = await req.json();
    const exists = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (exists) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    } else {
        const body: NewUserForm = {
            name: email.split('@')[0],
            email: email,
            password: await hash(password, 10),
            roleId: "64b14e612003f65367003ff1",
        }
        const user = await prisma.user.create({
            data: body
        });
        return NextResponse.json(user);
    }
}
