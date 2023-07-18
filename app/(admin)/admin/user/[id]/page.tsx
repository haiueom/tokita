import BackBtn from '@/components/buttons/back';
import SingleUser from '@/components/tables/user/single';
import { Flex, Title, Text } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>User Detail</Title>
                    <Text className="hidden sm:block">User detail retrieved from database.</Text>
                </div>
                <div>
                    <BackBtn type='user' />
                </div>
            </Flex>
            <SingleUser id={params.id} />
        </main>
    );
}
