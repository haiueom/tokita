import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const roles = await prisma.role.findMany({
        orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(roles, { status: 200 });
}

export async function POST(req: Request) {
    const { name } = await req.json();

    if (!name) {
        return new NextResponse("Name is required", { status: 400 });
    }

    const role = await prisma.role.create({
        data: {
            name,
        }
    });

    return NextResponse.json(role, { status: 201 });
}