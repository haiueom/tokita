import { Suspense } from 'react';
import { getServerSession } from 'next-auth/next';
import ClientNavbar from '@/components/navbars/client/navbar';

export default async function Layout({ children, }: { children: React.ReactNode; }) {
    const session = await getServerSession();
    return (
        <>
            <Suspense>
                <ClientNavbar user={session?.user} />
            </Suspense>
            {children}
        </>
    )
}