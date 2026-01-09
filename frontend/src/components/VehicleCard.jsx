import { Badge, Box, Button, Card, CardBody, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  return (
    <Card overflow="hidden">
      <Box position="relative">
        <Image src={vehicle.images[0]} alt={vehicle.title} h="190px" objectFit="cover" w="100%" />
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme={vehicle.isBooked ? "red" : "green"}
          borderRadius="full"
        >
          {vehicle.isBooked ? "booked" : "available"}
        </Badge>
        <Badge position="absolute" top={3} right={3} colorScheme="orange" borderRadius="full">
          {vehicle.type}
        </Badge>
      </Box>
      <CardBody>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Text fontWeight="700" fontSize="lg">
              {vehicle.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {vehicle.location} | {vehicle.transmission} | {vehicle.seats} seats
            </Text>
          </Stack>
          <HStack justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" color="gray.500">Hourly rate</Text>
              <Text fontWeight="700">INR {vehicle.hourlyRate}</Text>
            </Box>
            <Button as={RouterLink} to={`/vehicles/${vehicle.id}`} size="sm">
              View details
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
}
