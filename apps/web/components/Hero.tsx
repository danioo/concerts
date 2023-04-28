"use client"

import { Title, Text, Container, Button, Overlay, createStyles, Paper, Group, Center, SimpleGrid } from '@mantine/core';
import { IconMapPins, IconTimelineEvent, IconUsers } from '@tabler/icons';
import Link from 'next/link';
import { useVariableValue } from '@devcycle/devcycle-react-sdk'

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=980&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh'
  },

  inner: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  title: {
    fontWeight: 800,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('xs')]: {
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors.teal[4],
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    [theme.fn.smallerThan('xs')]: {
      fontSize: theme.fontSizes.md,
      textAlign: 'left',
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    fontSize: theme.fontSizes.md,
    marginTop: theme.spacing.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    [theme.fn.smallerThan('xs')]: {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export type HeroProps = {
  concertsCount: number,
  placesCount: number,
  usersCount: number
}

export default function Hero({ concertsCount, placesCount, usersCount }: HeroProps) {
  const { classes } = useStyles();
  const isVideoEnabled = useVariableValue('homepage-video', false)

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          {'Search for concerts '}
          <Text component="span" inherit className={classes.highlight}>
            next to you
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Check database of concerts that take place all over world and find the one next to you!
          </Text>
        </Container>

        {isVideoEnabled && (
          <div>Here there will be a video</div>
        )}

        <Paper withBorder radius="md" m="lg" p="lg">
          <SimpleGrid cols={3}>
            <Group>
              <Center>
                <IconTimelineEvent size="2rem" stroke={1.5} color='teal' />
              </Center>

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  Concerts
                </Text>
                <Text weight={700} size="xl">
                  {concertsCount}
                </Text>
              </div>
            </Group>

            <Group>
              <Center>
                <IconUsers size="2rem" stroke={1.5} color='steelblue' />
              </Center>

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  Users
                </Text>
                <Text weight={700} size="xl">
                  {usersCount}
                </Text>
              </div>
            </Group>

            <Group>
              <Center>
                <IconMapPins size="2rem" stroke={1.5} color='green' />
              </Center>

              <div>
                <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
                  Places
                </Text>
                <Text weight={700} size="xl">
                  {placesCount}
                </Text>
              </div>
            </Group>
          </SimpleGrid>
        </Paper>

        <div className={classes.controls}>
          <Link href="/concerts">
            <Button className={classes.control} color='teal' variant="filled" size="lg">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}