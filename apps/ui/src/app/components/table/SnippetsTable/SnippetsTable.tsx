import { ReactNode } from 'react';
import { Table } from '@mantine/core';
import { trpc } from '../../../../utils/tprc';
import TableWrapper from '../TableWrapper';
import { columns } from '../columns';
import CodeCell, { CodeCellProps } from './CodeCell';
import DesciptionCell, { DescriptionCellProps } from './DescriptionCell';
import LanguageCell, { LanguageCellProps } from './LanguageCell';

type ComponentProps = {
  code: CodeCellProps;
  description: DescriptionCellProps;
  language: LanguageCellProps;
};

const getCellComponent = (
  column: keyof ComponentProps,
  props: ComponentProps[keyof ComponentProps]
): ReactNode => {
  switch (column) {
    case 'code':
      return <CodeCell {...(props as CodeCellProps)} />;
    case 'description':
      return <DesciptionCell {...(props as DescriptionCellProps)} />;
    case 'language':
      return <LanguageCell {...(props as LanguageCellProps)} />;
  }
};

export default function SnippetsTable() {
  const { data: snippets } = trpc.getSnippets.useQuery();

  if (!snippets) {
    return null;
  }

  return (
    <TableWrapper type="snippets">
      {snippets.map((row) => (
        <Table.Tr key={row.id}>
          {columns['snippets'].map((column) => {
            const props: ComponentProps[keyof ComponentProps] = {
              codeBlock: row.code,
              extension: row.language,
              children: <div>{row.description}</div>,
            };

            return (
              <Table.Td key={`${row.id}-${column}`}>
                {getCellComponent(column as keyof ComponentProps, props)}
              </Table.Td>
            );
          })}
        </Table.Tr>
      ))}
    </TableWrapper>
  );
}
