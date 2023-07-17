import BackBtn from '@/components/buttons/back';
import SingleCategory from '@/components/tables/category/single';
import { Flex, Title, Text } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Category Detail</Title>
                    <Text>Category detail retrieved from database.</Text>
                </div>
                <div>
                    <BackBtn type="category"/>
                </div>
            </Flex>
            <SingleCategory id={params.id} />
        </main>
    );
}