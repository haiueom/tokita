import BackBtn from "@/components/buttons/back";
import { Flex, Title, Text } from "@tremor/react";
import AddRole from "@/components/forms/role/add";

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Add New Role</Title>
                    <Text className="hidden sm:block">Fill in the form below to add a new role.</Text>
                </div>
                <div>
                    <BackBtn type="role"/>
                </div>
            </Flex>
            <AddRole />
        </main>
    )
};
