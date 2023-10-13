import { Text } from '@mantine/core';
import { trpc } from '../../../utils/tprc';
import TableWrapper from '../TableWrapper';
import { toggleDialog } from '../../../store/dialog/dialogState';
import SnippetsTableRow from './SnippetsTableRow';
import CodeBlock from '../../CodeBlock/CodeBlock';
import ActionsCell from '../ActionsCell';

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

  const handleDelete = (id: number) => {
    toggleDialog('confirm', {
      confirmMessage: 'Are you sure you want to delete snippet ' + id,
      callback: () => deleteSnippet(id),
    });
  };

  return (
    <TableWrapper type="snippets">
      {snippets.map(({ id, code, description, language }) => (
        <SnippetsTableRow
          key={id}
          rows={[
            <>
              <Text>{description}</Text>
              <CodeBlock code={code} language={language} />
            </>,
            <ActionsCell id={id} onRequestDelete={() => handleDelete(id)} />,
          ]}
        />
      ))}
    </TableWrapper>
  );
}
