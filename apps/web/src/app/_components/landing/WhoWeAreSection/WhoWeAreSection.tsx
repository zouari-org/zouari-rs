'use client';

import { Box, Container, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { landingContent } from '../../../_content/landing';
import classes from './WhoWeAreSection.module.css';

export function WhoWeAreSection() {
  const { whoWeAre } = landingContent;

  return (
    <Box component="section" className={classes.root} id="who-we-are">
      {/* Responsive Padding: 
        Reduces vertical padding on mobile (60px) vs desktop (100px) 
      */}
      <Container size="lg" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          {/* Header: 
            Centered text with a max-width to keep line lengths readable 
          */}
          <Box maw={800} style={{ textAlign: 'center' }}>
            <Title order={2} className={classes.title}>
              {whoWeAre.title}
            </Title>
            <Text c="dimmed" mt="md" className={classes.body}>
              {whoWeAre.body}
            </Text>
          </Box>

          {/* Highlights Grid:
            - base: 1 column (Mobile) -> Fixes the "drawn out of view" issue
            - sm: 2 columns (Tablet/Desktop)
            - w="100%" ensures it takes full width of the container
          */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" verticalSpacing="lg" w="100%" mt="lg">
            {whoWeAre.highlights.map((highlight) => (
              <Paper
                key={highlight.title}
                p="xl"
                radius="md"
                withBorder
                className={classes.highlightItem}
              >
                <Text fw={700} fz="lg" mb="xs" className={classes.highlightTitle}>
                  {highlight.title}
                </Text>
                <Text c="dimmed" fz="sm" className={classes.highlightDescription}>
                  {highlight.description}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
