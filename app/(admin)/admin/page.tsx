import AllCategory from '@/components/tables/category/all';
import AllProduct from '@/components/tables/product/all';
import AllRole from '@/components/tables/role/all';
import AllUser from '@/components/tables/user/all';
import { Title, Text } from '@tremor/react';

export default async function IndexPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Title>Dashboard Page</Title>
            <Text>Welcome to the dashboard.</Text>
            <AllProduct />
            <Title className='mt-10'>Category</Title>
            <AllCategory />
            <Title className='mt-10'>User</Title>
            <AllUser />
            <Title className='mt-10'>Role</Title>
            <AllRole />
        </main>
    );
}
