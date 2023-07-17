import AddProduct from "@/components/forms/product/add";
import BackBtn from "@/components/buttons/back";
import { Flex, Title, Text } from "@tremor/react";

export default async function AddProductPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Flex>
                <div>
                    <Title>Add Product</Title>
                    <Text>Fill in the form below to add a new product.</Text>
                </div>
                <div>
                    <BackBtn type="product" />
                </div>
            </Flex>
            <AddProduct />
        </main>
    )
};
