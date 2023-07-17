import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const category = await prisma.category.findUnique({
        where: { id: id }
    });
    return NextResponse.json(category, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.category.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    const category = await prisma.category.update({
        where: { id: id },
        data: {
            name: name,
        }
    });

    return NextResponse.json(category, { status: 201 });
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.category.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    await prisma.category.delete({
        where: { id: id }
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
}