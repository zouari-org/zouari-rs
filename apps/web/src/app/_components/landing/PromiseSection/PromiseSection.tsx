'use client';

import { Box, Container, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './PromiseSection.module.css';

export function PromiseSection() {
  const { promise } = landingContent;

  return (
    <Box component="section" className={classes.root} id="promise">
      <Container size="lg" py={{ base: 60, md: 100 }}>
        <Stack gap="xl" align="center">
          <Box maw={700} style={{ textAlign: 'center' }}>
            <Title order={2} className={classes.title}>
              {promise.title}
            </Title>
          </Box>

          <Stack gap="md" w="100%" maw={700}>
            {promise.points.map((point) => (
              <Paper 
                key={point.title} 
                p="lg" 
                radius="md" 
                withBorder 
                className={classes.item}
              >
                {/* Group with nowrap ensures the checkmark stays 
                  aligned to the left of the text block 
                */}
                <Group align="flex-start" wrap="nowrap">
                  <ThemeIcon 
                    size="lg" 
                    radius="xl" 
                    variant="light" 
                    color="zouariPrimary"
                    style={{ flexShrink: 0 }} // Prevents icon squashing on small screens
                  >
                    <IconCheck size={18} stroke={2.5} />
                  </ThemeIcon>

                  <div>
                    <Text fw={700} fz="lg" mb={4} lh={1.3}>
                      {point.title}
                    </Text>
                    <Text c="dimmed" lh={1.6}>
                      {point.description}
                    </Text>
                  </div>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
