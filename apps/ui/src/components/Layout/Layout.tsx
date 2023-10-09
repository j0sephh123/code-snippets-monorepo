import { ActionIcon, AppShell, Group } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import ColorThemeSwitch from '../ColorThemeSwitch/ColorThemeSwitch';
import { Link } from 'wouter';

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Link href="/">
            <ActionIcon size="xl" variant="subtle">
              <IconHome size={30} />
            </ActionIcon>
          </Link>
          <ColorThemeSwitch />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
