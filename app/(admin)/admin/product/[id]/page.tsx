import BackBtn from '@/components/buttons/back';
import SingleProduct from '@/components/tables/product/single';
import { Flex, Title, Text } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Product Detail</Title>
                    <Text>Product detail retrieved from database.</Text>
                </div>
                <div>
                    <BackBtn type='product' />
                </div>
            </Flex>
            <SingleProduct id={params.id} />
        </main>
    );
}
