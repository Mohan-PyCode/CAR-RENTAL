import { Card, CardBody, HStack, Stack, Text } from "@chakra-ui/react";

export default function ReviewCard({ review }) {
  return (
    <Card>
      <CardBody>
        <Stack spacing={2}>
          <HStack justify="space-between">
            <Text fontWeight="600">{review.name}</Text>
            <Text fontWeight="600">{review.rating} stars</Text>
          </HStack>
          <Text color="gray.600" fontSize="sm">
            {review.comment}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
