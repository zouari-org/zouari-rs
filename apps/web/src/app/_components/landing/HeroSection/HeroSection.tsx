'use client';

import { Box, Button, Container, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import NextImage from 'next/image';
import logo from '../../../_assets/logo/ZOUARI-logo-line.svg';
import { landingContent } from '../../../_content/landing';
import classes from './HeroSection.module.css';

export function HeroSection() {
  const { hero } = landingContent;

  return (
    <Box component="section" className={classes.root} id="hero">
      <Container size="lg" py={{ base: 60, md: 120 }}>
        {/* Stack handles the vertical rhythm. 
          maw={720} keeps the line length readable on large screens.
        */}
        <Stack gap="xl" maw={720} className={classes.content}>
          
          <Box className={classes.logoWrapper}>
            <NextImage
              src={logo}
              alt="ZOUARI Logo"
              height={80}
              style={{ width: 'auto', maxHeight: '100%' }}
              priority
            />
          </Box>

          {/* Use Title for the main headline (H1) for SEO.
            Responsive font-size: 32px on mobile, 48px on desktop.
          */}
          <Title 
            order={1} 
            className={classes.subtitle}
            fz={{ base: 32, md: 48 }}
            lh={1.1}
          >
            {hero.subtitle}
          </Title>

          <Text 
            className={classes.description} 
            c="dimmed" 
            size="xl" 
            lh={1.6}
          >
            {hero.description}
          </Text>

          <Box mt="xs">
            <Button
              component="a"
              href={hero.ctaHref}
              size="lg"
              rightSection={<IconArrowRight size={18} />}
              color="zouariPrimary"
            >
              {hero.ctaLabel}
            </Button>
          </Box>

          {/* Replaced Group with SimpleGrid for robust responsiveness.
            - base: 2 columns (Mobile)
            - sm: 3 columns (Tablet+)
            This prevents stats from wrapping awkwardly.
          */}
          <SimpleGrid 
            cols={{ base: 2, sm: 3 }} 
            spacing="xl" 
            mt="xl"
            className={classes.statsGrid}
          >
            {hero.stats.map((stat) => (
              <Stack key={stat.label} gap={4}>
                <Text 
                  fz={{ base: 36, md: 48 }} 
                  fw={900} 
                  c="zouariPrimary" 
                  lh={1}
                >
                  {stat.value}
                </Text>
                <Text 
                  fz="sm" 
                  c="dimmed" 
                  tt="uppercase" 
                  fw={600} 
                  style={{ letterSpacing: rem(1) }}
                >
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
