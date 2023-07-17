import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(categories, { status: 200 });
}

export async function POST(req: Request) {
    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    const product = await prisma.category.create({
        data: {
            name,
        }
    });

    return NextResponse.json(product, { status: 201 });
}