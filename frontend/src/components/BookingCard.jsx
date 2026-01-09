import { Badge, Card, CardBody, HStack, Stack, Text } from "@chakra-ui/react";

export default function BookingCard({ booking }) {
  const color = booking.status === "confirmed" ? "green" : booking.status === "cancelled" ? "red" : "orange";
  return (
    <Card>
      <CardBody>
        <Stack spacing={2}>
          <HStack justify="space-between">
            <Text fontWeight="700">{booking.vehicle}</Text>
            <Badge colorScheme={color} borderRadius="full">
              {booking.status}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {booking.start} - {booking.end}
          </Text>
          <HStack justify="space-between">
            <Text fontSize="sm" color="gray.500">{booking.bookingId}</Text>
            <Text fontWeight="700">INR {booking.amount}</Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
