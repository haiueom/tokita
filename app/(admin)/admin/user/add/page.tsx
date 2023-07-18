import BackBtn from "@/components/buttons/back";
import { Flex, Title, Text } from "@tremor/react";
import AddUser from "@/components/forms/user/add";

export default async function AddProductPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Add User</Title>
                    <Text className="hidden sm:block">Fill in the form below to add a new user.</Text>
                </div>
                <div>
                    <BackBtn type="user" />
                </div>
            </Flex>
            <AddUser />
        </main>
    )
};
