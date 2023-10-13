import { ActionIcon, Group, Text, Tooltip } from '@mantine/core';
import { Prism } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mapPrismaEnumToLibraryLang from '../../utils/dataTransforms/mapPrismaEnumToLibraryLang';
import { Language } from '@prisma/client';
import classes from './CodeBlock.module.css';
import { IconCopy } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

type Props = {
  language: Language;
  code: string;
};

export default function CodeBlock({ language, code }: Props) {
  const [isClicked, setIsClicked] = useState(false);

  const handleTooltipClick = () => {
    navigator.clipboard.writeText(code);
    setIsClicked(true);
  };

  useEffect(() => {
    if (!isClicked) return;

    const timeout = window.setTimeout(() => {
      setIsClicked(false);
    }, 1200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isClicked]);

  return (
    <>
      <Group justify='space-between' className={classes.controls}>
        <Text c="dimmed">{language}</Text>
        <Tooltip label={isClicked ? 'Copied' : 'Copy'}>
          <ActionIcon
            onClick={handleTooltipClick}
            size="lg"
            variant={isClicked ? 'filled' : 'subtle'}
            className={classes.copy}
          >
            <IconCopy />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Prism
        language={mapPrismaEnumToLibraryLang(language)}
        style={atomDark}
        showLineNumbers
        customStyle={{
          borderBottom: '1px solid gray',
          borderRight: '1px solid gray',
          borderLeft: '1px solid gray',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          marginTop: 0,
        }}
      >
        {code}
      </Prism>
    </>
  );
}
