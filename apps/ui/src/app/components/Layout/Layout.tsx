import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';
import ColorThemeSwitch from '../ColorThemeSwitch/ColorThemeSwitch';

type Props = PropsWithChildren;

export default function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconHome size={30} />
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
