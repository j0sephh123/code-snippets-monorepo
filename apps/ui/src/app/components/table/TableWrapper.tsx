import { Table } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { columns } from './columns';

type Props = {
  type: keyof typeof columns;
} & PropsWithChildren;

export default function TableWrapper({ children, type }: Props) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {columns[type].map((column) => (
            <Table.Th key={column}>{column}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{children}</Table.Tbody>
    </Table>
  );
}
