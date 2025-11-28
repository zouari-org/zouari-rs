'use client';

import { Box, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import {
  IconChartDots3,
  IconCheck,
  IconLayout,
  IconServer2,
  IconShieldCheck,
} from '@tabler/icons-react';
import { landingContent } from '../../../_content/landing';
import classes from './ServicesSection.module.css';

const iconMap: Record<string, React.ElementType> = {
  server: IconServer2,
  shield: IconShieldCheck,
  layout: IconLayout,
  chart: IconChartDots3,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  capabilities: string[];
}

function FeatureCard({ icon, title, description, capabilities }: FeatureCardProps) {
  const Icon = iconMap[icon] || IconServer2;

  return (
    <div className={classes.card}>
      <div className={classes.cardIcon}>
        <Icon size={24} stroke={1.5} />
      </div>
      <h3 className={classes.cardTitle}>{title}</h3>
      <p className={classes.cardDescription}>{description}</p>
      <ul className={classes.capabilityList}>
        {capabilities.map((cap) => (
          <li key={cap} className={classes.capabilityItem}>
            <IconCheck size={14} className={classes.checkIcon} />
            {cap}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesSection() {
  const { services } = landingContent;

  return (
    <Box component="section" className={classes.root}>
      <Container size="lg" py={100}>
        <Stack gap="xl">
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {services.title}
            </Title>
            <Text className={classes.subtitle}>{services.subtitle}</Text>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xl">
            {services.features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                capabilities={feature.capabilities}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
