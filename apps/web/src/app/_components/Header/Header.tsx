'use client';

import { Box, Container, Group } from '@mantine/core';
import NextImage from 'next/image';
import logo from '../../_assets/logo/ZOUARI-logo-bold.svg';
import { ThemeToggle } from '../ThemeToggle';
import classes from './Header.module.css';

export function Header() {
  return (
    <Box component="header" className={classes.root}>
      <Container size="lg" className={classes.container}>
        <a href="/" className={classes.logoLink}>
          <NextImage
            src={logo}
            alt="ZOUARI"
            height={28}
            style={{ width: 'auto' }}
            priority
          />
        </a>

        <Group gap="sm">
          <a href="mailto:contact@zouari.org" className={classes.contactLink}>
            Contact
          </a>
          <ThemeToggle />
        </Group>
      </Container>
    </Box>
  );
}
