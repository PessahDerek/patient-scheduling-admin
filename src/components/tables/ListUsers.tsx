import {Checkbox, Table} from "@mantine/core";
import {useMemo} from "react";

interface props {
    users: UserObj[]
}

export default function ListUsers({users}: props) {
    const list = useMemo(() => {
        return users ? users : []
    }, [users]);
    return (
        <div className={"w-full flex flex-wrap-reverse"}>
            <Table striped stickyHeader>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>No.</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Phone</Table.Th>
                        <Table.Th>Email</Table.Th>
                        <Table.Th>Gender</Table.Th>
                        <Table.Th>Select</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {list.map((user, i) => (
                        <Table.Tr key={user.id}>
                            <Table.Td>{i + 1}</Table.Td>
                            <Table.Td>{`${user.firstName} ${user.lastName}`}</Table.Td>
                            <Table.Td>{user.phone}</Table.Td>
                            <Table.Td>{user.email}</Table.Td>
                            <Table.Td>{user.gender ?? "unknown"}</Table.Td>
                            <Table.Td><Checkbox/></Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
            <div>

            </div>
        </div>
    )
}

