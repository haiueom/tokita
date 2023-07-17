import prisma from '@/lib/prisma';
import { ProductForm } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;
    const product = await prisma.product.findUnique({
        where: { id: id }
    });
    return NextResponse.json(product, { status: 200 });
}

export async function PUT(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    const exist = await prisma.product.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const data = await req.json();

    const body: ProductForm = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: data.categoryId,
        isFeatured: data.isFeatured,
        image: data.image,
    }

    try {
        const product = await prisma.product.update({
            where: { id: id },
            data: body
        });

        return NextResponse.json(product, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
    const id = context.params.id;

    if (!id) {
        return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const exist = await prisma.product.findUnique({
        where: { id: id }
    });

    if (!exist) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
        where: { id: id }
    });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
}