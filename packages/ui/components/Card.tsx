import { createStyles, Card as _Card, Image, Text, Badge, Button, Group } from '@mantine/core'

type CardProps = {
  title: string,
  category: string,
  content: string,
  place: string,
  date: Date,
  onSale: boolean
}

const useStyles = createStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export const Card = ({ title, category, content, place, date, onSale }: CardProps) => {
  const { classes } = useStyles()

  return (
    <_Card p="lg" radius="sm" withBorder>
      <Group position="apart">
        <Text weight={500}>{title}</Text>

        <Badge color="teal" variant="light">{category}</Badge>
      </Group>

      <Text size="sm" color="dimmed" mb="md">
        {content}
      </Text>

      <_Card.Section className={classes.footer}>
        <div>
          <Text size="xs" color="dimmed">
            Date
          </Text>
          <Text weight={500} size="sm">
            {date}
          </Text>
        </div>

        <div>
          <Text size="xs" color="dimmed">
            Place
          </Text>
          <Text weight={500} size="sm">
            {place}
          </Text>
        </div>

        <div>
          <Text size="xs" color="dimmed">
            Tickets
          </Text>
          <Text weight={500} size="sm" c={onSale ? "green" : "red"}>
            {onSale ?  "On sale" : "Sold out"}
          </Text>
        </div>
      </_Card.Section>

      <Button variant="light" color="teal" fullWidth mt="md" radius="md">
        See more
      </Button>
    </_Card>
  )
}
