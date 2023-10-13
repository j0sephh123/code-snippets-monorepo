import { Stack, Text, Breadcrumbs, Anchor } from '@mantine/core';
import { trpc } from '../../utils/tprc';
import { Link } from 'wouter';
import CodeBlock from '../../components/CodeBlock/CodeBlock';

type Props = {
  id: string;
};

export default function SnippetPage({ id }: Props) {
  const { data } = trpc.getOneSnippet.useQuery(+id);

  if (!data) {
    return;
  }

  const { code, description, language } = data;

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
      <Stack>
        <CodeBlock code={code} language={language} />
        <Text>{description}</Text>
      </Stack>
    </>
  );
}
