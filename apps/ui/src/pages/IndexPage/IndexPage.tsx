import { Grid } from '@mantine/core';
import CodeBlock from '../../components/CodeBlock/CodeBlock';
import ActionsCell from '../../components/ActionsCell/ActionsCell';
import { toggleDialog } from '../../store/dialog/dialogState';
import { trpc } from '../../utils/tprc';
import { Fragment } from 'react';

export default function IndexPage() {
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

  return snippets.map(({ id, code, description, language }) => (
    <Fragment key={id}>
      <Grid>
        <Grid.Col span={11}>
          <CodeBlock
            code={code}
            language={language}
            description={description}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <ActionsCell id={id} onRequestDelete={() => handleDelete(id)} />
        </Grid.Col>
      </Grid>
      <hr />
    </Fragment>
  ));
}
