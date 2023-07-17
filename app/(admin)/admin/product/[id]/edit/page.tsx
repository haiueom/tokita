import BackBtn from '@/components/buttons/back';
import EditProduct from '@/components/forms/product/edit';
import { Title, Text, Flex } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Edit Product</Title>
                    <Text>Fill in the form below to edit a product.</Text>
                </div>
                <div>
                    <BackBtn type='product'/>
                </div>
            </Flex>
            <EditProduct id={params.id} />
        </main>
    )
};