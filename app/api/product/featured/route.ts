import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const products = await prisma.product.findMany({
        take: 8,
        where: { isFeatured: true },
        include: { category: true },
    });

    return NextResponse.json(products, { status: 200 });
}