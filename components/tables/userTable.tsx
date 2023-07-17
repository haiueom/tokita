import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
} from '@tremor/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersTableProps {
    users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Username</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>
                            <Text>{user.name}</Text>
                        </TableCell>
                        <TableCell>
                            <Text>{user.email}</Text>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UsersTable;
