'use client';

import { Box, Container, Stack, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './PromiseSection.module.css';

export function PromiseSection() {
  const { promise } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={100}>
        <Stack gap="xl" maw={700}>
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {promise.title}
            </Title>
          </Box>

          <div className={classes.list}>
            {promise.points.map((point) => (
              <div key={point.title} className={classes.item}>
                <div className={classes.itemIcon}>
                  <IconCheck size={18} stroke={2.5} />
                </div>
                <div>
                  <div className={classes.itemTitle}>{point.title}</div>
                  <div className={classes.itemDescription}>{point.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
