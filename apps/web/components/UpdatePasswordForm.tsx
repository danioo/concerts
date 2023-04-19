"use client"

import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';
import Link from 'next/link';

import { useAuth } from '../utils/auth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../types/supabase';

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

export default function UpdatePasswordForm() {
  const { classes } = useStyles()
  const { session, user } = useAuth()
  const supabaseClient = useSupabaseClient<Database>()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
  })

  const handleResetPassword = async (values: {email: string, password: string}) => {
    if (values.email) {
      const { error: resetError } = await  supabaseClient.auth.resetPasswordForEmail(values.email, {
        redirectTo: "http://localhost:3000/update-password"
      })

      if (resetError) {
        showNotification({
          title: "Error!",
          message: "An error occured while trying to reset your password",
          icon: <IconExclamationMark />,
          color: 'red',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[5],
              borderColor: theme.colors.red[5],
            },
            title: {
              color: theme.white
            },
            description: {
              color: theme.white
            },
            closeButton: {
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.colors.red[6]
              },
            }
          })
        })
      } else {
        showNotification({
          title: "Success!",
          message: "Information how to reset password has been sent to your email",
          icon: <IconCheck />,
          color: 'green',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.green[5],
              borderColor: theme.colors.green[5],
            },
            title: {
              color: theme.white
            },
            description: {
              color: theme.white
            },
            closeButton: {
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.colors.green[6]
              },
            }
          })
        })
      }
    }

    if (values.password) {
      const { error: updateError } = await supabaseClient.auth.updateUser({
        password: values.password
      })

      if (updateError) {
        console.error(updateError)

        showNotification({
          title: "Error!",
          message: "An error occured while trying to set new password",
          icon: <IconExclamationMark />,
          color: 'red',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[5],
              borderColor: theme.colors.red[5],
            },
            title: {
              color: theme.white
            },
            description: {
              color: theme.white
            },
            closeButton: {
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.colors.red[6]
              },
            }
          })
        })
      } else {
        showNotification({
          title: "Success!",
          message: "Your password has been changed",
          icon: <IconCheck />,
          color: 'green',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.green[5],
              borderColor: theme.colors.green[5],
            },
            title: {
              color: theme.white
            },
            description: {
              color: theme.white
            },
            closeButton: {
              color: theme.white,
              '&:hover': {
                backgroundColor: theme.colors.green[6]
              },
            }
          })
        })
      }
    }
  }

  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
        Reset your password
      </Title>

      <form onSubmit={form.onSubmit(handleResetPassword)}>
        {!session && <TextInput label="Mail" placeholder="Your mail address" mt="md" size="md" {...form.getInputProps('email')} />}
        {session && <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />}
        <Button fullWidth type='submit' mt="xl" size="md">
          {!session ? "Reset password" : "Update password"}
        </Button>
      </form>

      <Text align="center" mt="md">
        <Link href="/">
          Go back
        </Link>
      </Text>
    </Paper>
  )
}