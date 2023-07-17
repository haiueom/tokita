import BackBtn from '@/components/buttons/back';
import SingleRole from '@/components/tables/role/single';
import { Flex, Title, Text } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Role Detail</Title>
                    <Text>Role detail retrieved from database.</Text>
                </div>
                <div>
                    <BackBtn type="role"/>
                </div>
            </Flex>
            <SingleRole id={params.id} />
        </main>
    );
}