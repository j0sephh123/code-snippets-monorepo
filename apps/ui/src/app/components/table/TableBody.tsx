import { Table } from '@mantine/core';

export default function TableBody({ data }: { data: any[] }) {
  return (
    <>
      {data.map((element) => (
        <Table.Tr key={element.name}>
          <Table.Td>{element.position}</Table.Td>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.symbol}</Table.Td>
          <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
      ))}
    </>
  );
}
