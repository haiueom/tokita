import { Title, Text, Flex } from '@tremor/react';
import AddBtn from '@/components/buttons/add';
import AllRole from '@/components/tables/role/all';

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>User Roles</Title>
                    <Text>A list of roles retrieved from database.</Text>
                </div>
                <div>
                    <AddBtn type="role"/>
                </div>
            </Flex>
            <AllRole />
        </main>
    );
}
