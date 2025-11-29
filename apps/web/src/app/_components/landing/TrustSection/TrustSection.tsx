'use client';

import { Box, Container, Paper, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconClock, IconFileDescription, IconLock, IconUsers } from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './TrustSection.module.css';

const iconMap: Record<string, React.ElementType> = {
  lock: IconLock,
  document: IconFileDescription,
  clock: IconClock,
  users: IconUsers,
};

interface TrustCardProps {
  icon: string;
  title: string;
  description: string;
}

function TrustCard({ icon, title, description }: TrustCardProps) {
  const Icon = iconMap[icon] || IconLock;

  return (
    <Paper 
      p="xl" 
      radius="md" 
      withBorder 
      className={classes.card}
    >
      {/* Flex layout to align Icon and Text side-by-side.
        We use a div here for simple layout control inside the Paper.
      */}
      <div style={{ display: 'flex', gap: 'var(--mantine-spacing-md)' }}>
        <ThemeIcon 
          size="xl" 
          radius="md" 
          variant="light" 
          color="zouariPrimary" 
          style={{ flexShrink: 0 }} // Prevent icon from shrinking on small screens
        >
          <Icon size={22} stroke={1.5} />
        </ThemeIcon>
        
        <div>
          <Text fw={700} fz="lg" mb="xs" lh={1.2} className={classes.cardTitle}>
            {title}
          </Text>
          <Text c="dimmed" fz="sm" lh={1.6} className={classes.cardDescription}>
            {description}
          </Text>
        </div>
      </div>
    </Paper>
  );
}

export function TrustSection() {
  const { trust } = landingContent;

  return (
    <Box component="section" className={classes.root} id="trust">
      {/* Responsive padding: smaller on mobile */}
      <Container size="lg" py={{ base: 60, md: 100 }}>
        <Stack gap="xl">
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {trust.title}
            </Title>
          </Box>

          {/* Responsive Grid:
            - base: 1 column (Mobile)
            - sm: 2 columns (Tablet/Desktop)
            This ensures cards never get squished or overflow.
          */}
          <SimpleGrid 
            cols={{ base: 1, sm: 2 }} 
            spacing="lg" 
            verticalSpacing="lg"
          >
            {trust.items.map((item) => (
              <TrustCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
