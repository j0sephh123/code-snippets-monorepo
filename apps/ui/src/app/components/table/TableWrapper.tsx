import { Table } from '@mantine/core';
import { PropsWithChildren } from 'react';

type Props = {
  columns: string[];
} & PropsWithChildren;

export default function TableWrapper({ children, columns }: Props) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {columns.map((column) => (
            <Table.Th key={column}>{column}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
}
