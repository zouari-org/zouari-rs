'use client';

import {
  Box,
  Container,
  List,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
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
    <Paper radius="md" withBorder p="xl" className={classes.card}>
      <ThemeIcon size="xl" radius="md" variant="light" color="zouariPrimary" mb="md">
        <Icon size={24} stroke={1.5} />
      </ThemeIcon>

      <Text fw={700} fz="xl" className={classes.cardTitle}>
        {title}
      </Text>

      <Text c="dimmed" mt="sm" mb="lg" className={classes.cardDescription}>
        {description}
      </Text>

      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={20} radius="xl" variant="light">
            <IconCheck size={12} stroke={2.5} />
          </ThemeIcon>
        }
      >
        {capabilities.map((cap) => (
          <List.Item key={cap} className={classes.capabilityItem}>
            {cap}
          </List.Item>
        ))}
      </List>
    </Paper>
  );
}

export function ServicesSection() {
  const { services } = landingContent;

  return (
    <Box component="section" className={classes.root} id="services">
      <Container size="lg" py={{ base: 60, md: 100 }}>
        <Stack gap="xl">
          <Box className={classes.header}>
            <Title order={2} className={classes.title}>
              {services.title}
            </Title>
            <Text c="dimmed" mt="md" className={classes.subtitle}>
              {services.subtitle}
            </Text>
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
