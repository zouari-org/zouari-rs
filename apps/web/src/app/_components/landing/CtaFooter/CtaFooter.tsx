'use client';

import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './CtaFooter.module.css';

export function CtaFooter() {
  const { ctaFooter } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={100}>
        <Stack gap="lg" maw={640} className={classes.content}>
          <Title order={2} className={classes.title}>
            {ctaFooter.title}
          </Title>
          <Text className={classes.body}>{ctaFooter.body}</Text>
          <div className={classes.buttons}>
            <a href={ctaFooter.ctaHref} className={classes.ctaPrimary}>
              {ctaFooter.ctaLabel}
              <IconArrowRight size={18} />
            </a>
            {ctaFooter.secondaryCta && (
              <a href={ctaFooter.secondaryCta.href} className={classes.ctaSecondary}>
                <IconDownload size={18} />
                {ctaFooter.secondaryCta.label}
              </a>
            )}
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
