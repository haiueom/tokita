import ProductDetail from "@/components/ui/productDetail";

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <ProductDetail id={params.id} />
        </main>
    );
}