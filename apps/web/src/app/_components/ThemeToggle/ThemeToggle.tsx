'use client';

import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import classes from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
      className={classes.toggle}
    >
      <IconSun className={classes.sunIcon} size={20} stroke={1.5} />
      <IconMoon className={classes.moonIcon} size={20} stroke={1.5} />
    </ActionIcon>
  );
}
