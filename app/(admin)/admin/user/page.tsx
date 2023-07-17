import { Title, Text, Flex } from '@tremor/react';
import AddBtn from '@/components/buttons/add';
import AllUser from '@/components/tables/user/all';

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Manage Users</Title>
                    <Text>Admin page to manage users.</Text>
                </div>
                <div>
                    <AddBtn type="user"/>
                </div>
            </Flex>
            <AllUser />
        </main>
    );
}
