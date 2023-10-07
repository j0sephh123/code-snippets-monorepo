import { Stack, Text } from '@mantine/core';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import classes from './SnippetPage.module.css';
import Copy from '../../components/Copy/Copy';

const codeString = `import React from 'react';
import { Code } from '@mantine/core';

function Demo() {
  return <Code>React.createElement()123</Code>;
}`;

type Props = {
  id: string;
};

export default function SnippetPage({ id }: Props) {
  console.log({ id });

  return (
    <Stack
      style={{
        position: 'relative',
      }}
    >
      <Copy
        className={classes.copy}
        onClick={() => navigator.clipboard.writeText(codeString)}
      />

      <SyntaxHighlighter
        language="javascript"
        style={atomDark}
        showLineNumbers
        customStyle={{
          border: '1px solid gray',
        }}
      >
        {codeString}
      </SyntaxHighlighter>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste saepe
        omnis, autem illum dolorum enim a accusantium sequi eveniet adipisci hic
        ad? Aut repellat quidem vel molestiae sint iusto nam.
      </Text>
    </Stack>
  );
}
