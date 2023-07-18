import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { hash } from 'bcrypt'

const adminRoleId = "64b14e622003f65367003ff2"
const userRoleId = "64b14e612003f65367003ff1"
const uncategorizedCategoryId = "64b247264a8ce639a6456d4d"

async function main() {
    const roleAdmin = await prisma.role.upsert({
        where: { id: adminRoleId },
        update: {
            name: 'Admin',
        },
        create: {
            name: 'Admin',
        },
    })
    const roleUser = await prisma.role.upsert({
        where: { id: userRoleId },
        update: {
            name: 'User',
        },
        create: {
            name: 'User',
        },
    })
    const userAdmin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: await hash('admin', 10),
            roleId: adminRoleId,
        },
        create: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: await hash('admin', 10),
            roleId: adminRoleId,
        },
    })
    const userUser = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {
            email: 'user@gmail.com',
            name: 'User',
            password: await hash('user', 10),
            roleId: userRoleId,
        },
        create: {
            email: 'user@gmail.com',
            name: 'User',
            password: await hash('user', 10),
            roleId: userRoleId,
        },
    })
    const uncategorized = await prisma.category.upsert({
        where: { id: uncategorizedCategoryId },
        update: {
            name: 'Uncategorized',
        },
        create: {
            name: 'Uncategorized',
        },
    })
    console.log({ roleAdmin, roleUser, userAdmin, userUser, uncategorized })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })