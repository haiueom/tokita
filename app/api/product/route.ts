import prisma from '@/lib/prisma';
import { ProductForm } from '@/types';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'asc' },
        include: { category: true },
    });

    return NextResponse.json(products, { status: 200 });
}

export async function POST(req: Request) {
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
        const product = await prisma.product.create({
            data: body
        });

        return NextResponse.json(product, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}