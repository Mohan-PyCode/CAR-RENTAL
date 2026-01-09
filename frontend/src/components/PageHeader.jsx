import { Heading, Stack, Text } from "@chakra-ui/react";

export default function PageHeader({ title, subtitle }) {
  return (
    <Stack spacing={2} mb={8}>
      <Heading size="xl">{title}</Heading>
      {subtitle ? <Text color="gray.600">{subtitle}</Text> : null}
    </Stack>
  );
}
