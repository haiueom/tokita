import { Title, Text, Flex } from '@tremor/react';
import AddBtn from '@/components/buttons/add';
import AllCategory from '@/components/tables/category/all';

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Product Categories</Title>
                    <Text>A list of categories retrieved from database.</Text>
                </div>
                <div>
                    <AddBtn type="category"/>
                </div>
            </Flex>
            <AllCategory />
        </main>
    );
}
