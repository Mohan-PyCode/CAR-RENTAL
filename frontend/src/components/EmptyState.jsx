import { Box, Button, Stack, Text } from "@chakra-ui/react";

export default function EmptyState({ title, description, actionLabel }) {
  return (
    <Box p={8} border="1px dashed #e7dac8" borderRadius="24px" bg="white">
      <Stack spacing={3} align="start">
        <Text fontWeight="600">{title}</Text>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
        {actionLabel ? <Button size="sm">{actionLabel}</Button> : null}
      </Stack>
    </Box>
  );
}
