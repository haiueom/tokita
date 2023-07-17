import BackBtn from '@/components/buttons/back';
import EditUser from '@/components/forms/user/edit';
import { Title, Text, Flex } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Edit User</Title>
                    <Text>Fill in the form below to edit a user.</Text>
                </div>
                <div>
                    <BackBtn type='user'/>
                </div>
            </Flex>
            <EditUser id={params.id} />
        </main>
    )
};