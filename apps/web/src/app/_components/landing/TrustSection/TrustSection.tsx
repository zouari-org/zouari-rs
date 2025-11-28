'use client';

import { Box, Container, Stack, Title } from '@mantine/core';
import {
  IconClock,
  IconFileDescription,
  IconLock,
  IconUsers,
} from '@tabler/icons-react';
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
    <div className={classes.card}>
      <div className={classes.cardIcon}>
        <Icon size={20} stroke={1.5} />
      </div>
      <div>
        <div className={classes.cardTitle}>{title}</div>
        <div className={classes.cardDescription}>{description}</div>
      </div>
    </div>
  );
}

export function TrustSection() {
  const { trust } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={100}>
        <Stack gap="xl">
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {trust.title}
            </Title>
          </Box>

          <div className={classes.grid}>
            {trust.items.map((item) => (
              <TrustCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
