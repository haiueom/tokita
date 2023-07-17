import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const role = await prisma.role.findUnique({
        where: { id: id }
    });
    return NextResponse.json(role, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.role.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    const role = await prisma.role.update({
        where: { id: id },
        data: {
            name: name,
        }
    });

    return NextResponse.json(role, { status: 201 });
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.role.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Role not found' }, { status: 404 });
    }

    await prisma.role.delete({
        where: { id: id }
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
}