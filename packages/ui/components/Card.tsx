import { Card as _Card, Image, Text, Badge, Button, Group } from '@mantine/core'

type CardProps = {
  title: string,
  category: string,
  content: string
}

export const Card = ({ title, category, content}: CardProps) => {
  return (
    <_Card p="lg" radius="sm" withBorder>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>

        <Badge color="teal" variant="light">{category}</Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {content}
      </Text>

      <Button variant="light" color="teal" fullWidth mt="md" radius="md">
        See more
      </Button>
    </_Card>
  )
}
