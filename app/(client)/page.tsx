// "use client";

import { Card } from '@tremor/react';
import ProductCard from '@/components/ui/product.card';
import Footer from '@/components/footer/footer';
// import { Metadata } from 'next'

// export const metadata: Metadata = {
//     title: 'Home Page',
//     description: 'Home page of the app',
// }

export default async function IndexPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Card style={{ backgroundImage: "url(https://res.cloudinary.com/dzkt3vssb/image/upload/v1687803164/kjnq9eohsewkrhlbikuu.png)" }} className="rounded-xl relative aspect-[2.4/1] overflow-hidden bg-cover">
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        Welcome to the Tokita
                    </div>
                </div>
            </Card>
            <h3 className="my-8 font-bold text-2xl">
                Featured Products
            </h3>
            <ProductCard />
            <Footer />
        </main>
    );
}