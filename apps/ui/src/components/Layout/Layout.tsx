import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import ColorThemeSwitch from '../ColorThemeSwitch/ColorThemeSwitch';
import { Link } from 'wouter';

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 150, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href="/">
            <ActionIcon size="xl" variant="subtle">
              <IconHome size={30} />
            </ActionIcon>
          </Link>
          <ColorThemeSwitch />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        Navbar
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
