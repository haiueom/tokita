import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import AdminNavbar from '@/components/navbars/admin/navbar';

export default async function AdminLayout({ children, }: { children: React.ReactNode; }) {
    const session = await getServerSession();
    return (
        <>
            <Suspense>
                <AdminNavbar user={session?.user} />
            </Suspense>
            {children}
        </>
    )
}