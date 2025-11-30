'use client';

import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './CtaFooter.module.css';

export function CtaFooter() {
  const { ctaFooter } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={{ base: 60, md: 100 }}>
        {/* Center alignment for the stack ensures the text 
          looks good on all screen sizes. 
        */}
        <Stack gap="xl" align="center" maw={640} mx="auto" className={classes.content}>
          <Box style={{ textAlign: 'center' }}>
            <Title order={2} className={classes.title}>
              {ctaFooter.title}
            </Title>
            <Text c="dimmed" mt="md" size="lg" className={classes.body}>
              {ctaFooter.body}
            </Text>
          </Box>

          {/* Group manages the buttons. 
            - justify="center": centers them horizontally
            - gap="md": adds space between them
            Buttons automatically stack if the screen is too narrow.
          */}
          <Group justify="center" gap="md">
            <Button
              component="a"
              href={ctaFooter.ctaHref}
              size="lg"
              color="zouariPrimary"
              rightSection={<IconArrowRight size={18} />}
            >
              {ctaFooter.ctaLabel}
            </Button>

            {ctaFooter.secondaryCta && (
              <Button
                component="a"
                href={ctaFooter.secondaryCta.href}
                size="lg"
                variant="default" // "Default" variant usually looks good for secondary actions
                leftSection={<IconDownload size={18} />}
              >
                {ctaFooter.secondaryCta.label}
              </Button>
            )}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
