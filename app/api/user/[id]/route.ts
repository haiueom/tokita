import prisma from '@/lib/prisma';
import { EditUserForm } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: { role: true },
    });
    return NextResponse.json(user, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.user.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }

    const data = await req.json();

    const body: EditUserForm = {
        name: data.name,
        email: data.email,
        roleId: data.roleId,
    }

    try {
        const user = await prisma.user.update({
            where: { id: id },
            data: body
        });

        return NextResponse.json(user, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const exist = await prisma.user.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await prisma.user.delete({
        where: { id: id }
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
}