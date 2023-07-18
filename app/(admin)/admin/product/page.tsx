import { Title, Text, Flex } from '@tremor/react';
import AddBtn from '@/components/buttons/add';
import AllProduct from '@/components/tables/product/all';

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Admin Products</Title>
                    <Text className="hidden sm:block">A list of products retrieved from database.</Text>
                </div>
                <div>
                    <AddBtn type="product"/>
                </div>
            </Flex>
            <AllProduct />
        </main>
    );
}
