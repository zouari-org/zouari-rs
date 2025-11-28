'use client';

import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { landingContent } from '../../../_content/landing';
import classes from './WhoWeAreSection.module.css';

export function WhoWeAreSection() {
  const { whoWeAre } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={100}>
        <Stack gap="md" maw={800}>
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {whoWeAre.title}
            </Title>
            <Text className={classes.body}>{whoWeAre.body}</Text>
          </Box>

          <Box className={classes.highlightsGrid}>
            {whoWeAre.highlights.map((highlight) => (
              <div key={highlight.title} className={classes.highlightItem}>
                <div className={classes.highlightTitle}>{highlight.title}</div>
                <div className={classes.highlightDescription}>
                  {highlight.description}
                </div>
              </div>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
