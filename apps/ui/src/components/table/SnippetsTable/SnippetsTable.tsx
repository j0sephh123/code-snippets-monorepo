import { ReactNode } from 'react';
import { Table } from '@mantine/core';
import { trpc } from '../../../utils/tprc';
import TableWrapper from '../TableWrapper';
import { columns } from '../columns';
import CodeCell from './CodeCell';
import DesciptionCell from './DescriptionCell';
import LanguageCell from './LanguageCell';
import ActionsCell from './ActionsCell';
import { dialogState, toggleDialog } from '../../../store/dialog/dialogState';

type ComponentProps = {
  code: Parameters<typeof CodeCell>[0];
  description: Parameters<typeof DesciptionCell>[0];
  language: Parameters<typeof LanguageCell>[0];
  actions: Parameters<typeof ActionsCell>[0];
};

const getCellComponent = (
  column: keyof ComponentProps,
  props: ComponentProps[keyof ComponentProps]
): ReactNode => {
  switch (column) {
    case 'actions':
      return <ActionsCell {...(props as ComponentProps['actions'])} />;
    case 'code':
      return <CodeCell {...(props as ComponentProps['code'])} />;
    case 'description':
      return <DesciptionCell {...(props as ComponentProps['description'])} />;
    case 'language':
      return <LanguageCell {...(props as ComponentProps['language'])} />;
  }
};

// Experimenting with Typescript
export default function SnippetsTable() {
  const { data: snippets, refetch } = trpc.getSnippets.useQuery();
  const { mutate: deleteSnippet } = trpc.deleteSnippet.useMutation({
    onSuccess() {
      toggleDialog('closed');
      refetch();
    },
  });

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
              id: row.id,
              onRequestDelete: () => {
                toggleDialog('confirm', {
                  confirmMessage:
                    'Are you sure you want to delete snippet ' + row.id,
                  callback: () => deleteSnippet(+row.id),
                });
              },
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
