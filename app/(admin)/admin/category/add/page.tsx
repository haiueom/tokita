import AddCategory from "@/components/forms/category/add";
import BackBtn from "@/components/buttons/back";
import { Flex, Title, Text } from "@tremor/react";

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Add New Category</Title>
                    <Text>Fill in the form below to add a new category.</Text>
                </div>
                <div>
                    <BackBtn type="category"/>
                </div>
            </Flex>
            <AddCategory />
        </main>
    )
};
