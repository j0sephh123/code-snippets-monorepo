import { Table } from '@mantine/core';
import { ReactNode } from 'react';

type Props = {
  rows: ReactNode[];
};

export default function SnippetsTableRow({ rows }: Props) {
  return (
    <Table.Tr>
      {rows.map((row, index) => (
        <Table.Td key={index}>{row}</Table.Td>
      ))}
    </Table.Tr>
  );
}
