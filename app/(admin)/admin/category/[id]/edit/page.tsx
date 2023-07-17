import BackBtn from '@/components/buttons/back';
import EditCategory from '@/components/forms/category/edit';
import { Title, Text, Flex } from '@tremor/react';

export default async function Page({ params }: { params: { id: string } }) {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Edit Category</Title>
                    <Text>Fill in the form below to edit a category.</Text>
                </div>
                <div>
                    <BackBtn type='category'/>
                </div>
            </Flex>
            <EditCategory id={params.id} />
        </main>
    )
};