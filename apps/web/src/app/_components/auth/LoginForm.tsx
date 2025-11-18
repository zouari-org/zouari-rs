'use client';

import { Button, Container, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { zLoginParams } from '@zouari-rs/validation';
import { zodResolver } from 'mantine-form-zod-resolver';
import type { z } from 'zod';
import { api } from '@/lib/api';

// 1. Infer the shape of the form values from your shared Zod schema
type LoginFormValues = z.infer<typeof zLoginParams>;

// 2. Define the API response type based on the client method
type LoginResponse = Awaited<ReturnType<(typeof api)['auth']['login']>>;

// 3. Define a loose type for the error (openapi-typescript-codegen usually throws an object with message/status)
type ApiError = {
  message?: string;
  status?: number;
  body?: unknown;
};

export function LoginForm() {
  // 4. Initialize Mantine form with Zod validation
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(zLoginParams),
  });

  // 5. Set up the mutation
  const loginMutation = useMutation<LoginResponse, ApiError, LoginFormValues>({
    mutationFn: async (values) => {
      // The generated function expects the body content (values) directly
      return await api.auth.login(values);
    },
    onSuccess: (data) => {
      notifications.show({
        title: 'Welcome back!',
        message: `Logged in as ${data.name}`,
        color: 'green',
      });

      // TODO: Replace with HttpOnly cookie set by backend in the future
      localStorage.setItem('token', data.token);

      // Redirect logic would go here (e.g., router.push('/dashboard'))
    },
    onError: (error) => {
      const status = error.status;
      let message = 'Unable to sign you in right now. Please try again.';

      if (status === 401) {
        message = 'Incorrect email or password.';
      } else if (error.message) {
        message = error.message;
      }

      notifications.show({
        title: 'Login Failed',
        message,
        color: 'red',
      });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            withAsterisk
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            withAsterisk
            mt="md"
            {...form.getInputProps('password')}
          />

          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={loginMutation.isPending}
            disabled={loginMutation.isPending}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
