import { Stack, Text, Breadcrumbs, Anchor } from '@mantine/core';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classes from './SnippetPage.module.css';
import Copy from '../../components/Copy/Copy';
import { trpc } from '../../utils/tprc';
import { Link } from 'wouter';

type Props = {
  id: string;
};

export default function SnippetPage({ id }: Props) {
  const { data } = trpc.getOneSnippet.useQuery(+id);

  if (!data) {
    return;
  }

  const { code, description } = data;

  // TODO extract as a hook or a wrapper to use when there are more pages
  const items = [
    { title: 'Mantine', href: '/' },
    { title: id, href: `/snippets/${id}` },
  ].map(({ href, title }) => (
    <Anchor component={Link} href={href} key={href}>
      {title}
    </Anchor>
  ));

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Stack className={classes.stack}>
        <Copy
          className={classes.copy}
          onClick={() => navigator.clipboard.writeText(code)}
        />

        <SyntaxHighlighter
          language="javascript"
          style={atomDark}
          showLineNumbers
          customStyle={{
            border: '1px solid gray',
          }}
        >
          {code}
        </SyntaxHighlighter>
        <Text>{description}</Text>
      </Stack>
    </>
  );
}
