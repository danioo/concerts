"use client"

import { useState } from 'react';
import { createStyles, AppShell as _AppShell, Navbar, UnstyledButton, Tooltip, Title, Group, Flex, Text } from '@mantine/core';
import {
  IconHome2,
  IconUser,
} from '@tabler/icons';
import Link from 'next/link';

import { useAuth } from '../utils/auth';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
  },

  aside: {
    flex: '0 0 60px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  mainLink: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  mainLinkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  title: {
    boxSizing: 'border-box',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },

  linkActive: {
    '&, &:hover': {
      borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background,
      color: theme.white,
    },
  },
}));

const mainLinksMockdata = [
  { icon: IconHome2, label: 'Home' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { classes, cx } = useStyles();
  const [activeLink, setActiveLink] = useState('Home');
  const { session, user } = useAuth()

  const mainLinks = mainLinksMockdata.map((link) => (
      <Tooltip label={link.label} position="right" withArrow transitionDuration={0} key={link.label}>
        <UnstyledButton
          onClick={() => setActiveLink(link.label)}
          className={cx(classes.mainLink, { [classes.mainLinkActive]: link.label === activeLink })}
        >
          <link.icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    ));

  return (
    <_AppShell padding="md" navbar={
      <Navbar width={{ sm: 50 }}>
        <Navbar.Section m="auto" p="lg">
          <Text fz="xl" c="teal" fw="bolder">
            C
          </Text>
        </Navbar.Section>

        <Navbar.Section grow m="auto">
          {mainLinks}
        </Navbar.Section>

        <Navbar.Section m="auto">
          <Tooltip label="Account" position="right" withArrow transitionDuration={0}>
            <UnstyledButton className={cx(classes.mainLink)}>
              <Link href={session ? "/profile" : "/login"}>
                <IconUser stroke={1.5} />
              </Link>
            </UnstyledButton>
          </Tooltip>
        </Navbar.Section>
      </Navbar>
    }>
      {children}
    </_AppShell>
  )
}