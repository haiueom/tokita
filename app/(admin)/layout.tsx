import Navbar from '@/components/navbars/navbar';
import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';

export default async function AdminLayout({ children, }: { children: React.ReactNode; }) {
    const session = await getServerSession();
    return (
        <>
            <Suspense>
                <Navbar user={session?.user} />
            </Suspense>
            {children}
        </>
    )
}