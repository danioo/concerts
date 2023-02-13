"use client"

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form'
import Link from 'next/link';

import { supabaseBrowserClient } from '../utils/supabase-browser'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function LoginForm() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      keepSignedIn: false
    }
  })

  const handleLogin = async (values: {email: string, password: string}) => {
    const { error } = await supabaseBrowserClient.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      console.error(error)
    }
  }

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
        Welcome back to Concerts!
      </Title>

      <form onSubmit={form.onSubmit(handleLogin)}>
        <TextInput label="Mail" placeholder="Your mail address" mt="md" size="md" {...form.getInputProps('email')} />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
        <Checkbox label="Keep me logged in" mt="xl" size="md" {...form.getInputProps('keepSignedIn')} />
        <Button fullWidth type='submit' mt="xl" size="md">
          Login
        </Button>
      </form>

      <Text align="center" mt="md">
        Forget your password?{' '}
        <Link href="/update-password">
          Reset password
        </Link>
      </Text>

      <Text align="center" mt="md">
        Don&apos;t have an account?{' '}
        <Link href="/register">
          Register
        </Link>
      </Text>

      <Text align="center" mt="md">
        <Link href="/">
          Go back
        </Link>
      </Text>
    </Paper>
  )
}