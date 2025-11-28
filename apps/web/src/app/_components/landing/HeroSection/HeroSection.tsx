'use client';

import { Box, Container, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import NextImage from 'next/image';
import logo from '../../../_assets/logo/ZOUARI-logo-line.svg';
import { landingContent } from '../../../_content/landing';
import classes from './HeroSection.module.css';

export function HeroSection() {
  const { hero } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={120}>
        <Stack gap="lg" maw={720} className={classes.content}>
          <Box className={classes.logoWrapper}>
            <NextImage
              src={logo}
              alt="ZOUARI Logo"
              height={80}
              style={{ width: 'auto' }}
              priority
            />
          </Box>
          <Text className={classes.subtitle}>{hero.subtitle}</Text>

          <Text className={classes.description}>{hero.description}</Text>

          <Box mt="xs">
            <a href={hero.ctaHref} className={classes.cta}>
              {hero.ctaLabel}
              <IconArrowRight size={18} />
            </a>
          </Box>

          <Box className={classes.statsGrid}>
            {hero.stats.map((stat) => (
              <div key={stat.label} className={classes.statItem}>
                <div className={classes.statValue}>{stat.value}</div>
                <div className={classes.statLabel}>{stat.label}</div>
              </div>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
