import AllTable from '@/components/tables/all.user';
import { Title, Text } from '@tremor/react';

export default async function IndexPage() {
    return (
        <main className="mx-auto max-w-7xl p-4 md:p-10">
            <Title>Users</Title>
            <Text>A list of users retrieved from a MySQL database (PlanetScale).</Text>
            <AllTable />
        </main>
    );
}
