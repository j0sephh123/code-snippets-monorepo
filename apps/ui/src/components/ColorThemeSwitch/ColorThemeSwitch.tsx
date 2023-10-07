import cx from 'clsx';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  Tooltip,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ColorThemeSwitch.module.css';

// Reused from this example:
// https://ui.mantine.dev/component/action-toggle/
export default function ColorThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <Tooltip label="Toggle color scheme">
        <ActionIcon
          onClick={() =>
            setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
