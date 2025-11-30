'use client';

import { AppShell, Burger, Button, Container, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NextImage from 'next/image';
import Link from 'next/link'; // Use Next.js Link for client-side nav
import logo from '../../_assets/logo/ZOUARI-logo-bold.svg';
import { landingContent } from '../../_content/landing';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { ThemeToggle } from '../ThemeToggle';
import classes from './AppLayout.module.css';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();

  // Destructure the contact info
  const { contact } = landingContent;

  // Centralized navigation configuration
  // These IDs must match the id="" props in your section components
  const navLinks = [
    { label: 'Who We Are', href: '#who-we-are' },
    { label: 'Services', href: '#services' },
    { label: 'Trust', href: '#trust' },
    { label: 'Our Promise', href: '#promise' },
  ];

  return (
    <AppShell
      header={{ height: 64 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { desktop: true, mobile: !opened },
      }}
      // We set padding to 0 so the Hero section can touch the edges/header
      padding="0"
    >
      <AppShell.Header className={classes.header}>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <NextImage src={logo} alt="ZOUARI" height={28} style={{ width: 'auto' }} priority />
            </Link>

            {/* Desktop Navigation (Visible from 'sm' up) */}
            <Group gap="sm" visibleFrom="sm">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={classes.link}>
                  {link.label}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className={classes.link}>
                Contact
              </a>
              <ThemeToggle />
            </Group>

            {/* Mobile Actions (Hidden from 'sm' up) */}
            <Group hiddenFrom="sm">
              <ThemeToggle />
              <Burger opened={opened} onClick={toggle} size="sm" />
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile Navigation Drawer */}
      <AppShell.Navbar className={classes.header} p="md">
        <Stack gap="md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={classes.link}
              onClick={close} // Close drawer when clicking a link
            >
              {link.label}
            </a>
          ))}
          <Button component="a" href={`mailto:${contact.email}`} fullWidth onClick={close}>
            Contact Us
          </Button>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <ScrollToTop />
    </AppShell>
  );
}
