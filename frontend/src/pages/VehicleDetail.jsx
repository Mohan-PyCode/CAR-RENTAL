import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import { reviews, vehicles } from "../data/mock.js";

const vehicle = vehicles[0];

export default function VehicleDetail() {
  return (
    <AppLayout>
      <PageHeader title={vehicle.title} subtitle={`${vehicle.location} - Pickup at ${vehicle.pickupLocation}`} />
      <Grid templateColumns={{ base: "1fr", lg: "1.3fr 0.7fr" }} gap={10}>
        <GridItem>
          <Stack spacing={6}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {vehicle.images.map((src, index) => (
                <Image key={index} src={src} alt={vehicle.title} borderRadius="16px" />
              ))}
            </SimpleGrid>
            <Card>
              <CardBody>
                <Stack spacing={3}>
                  <HStack justify="space-between">
                    <Text fontWeight="700">Vehicle details</Text>
                    <Badge colorScheme="orange" borderRadius="full">
                      {vehicle.type}
                    </Badge>
                  </HStack>
                  <HStack spacing={8} fontSize="sm" color="gray.600">
                    <Text>{vehicle.transmission}</Text>
                    <Text>{vehicle.seats} seats</Text>
                    <Text>Rating {vehicle.rating}</Text>
                  </HStack>
                  <Text color="gray.600">
                    Owner verified, sanitized, and ready for delivery. Pickup and drop are customizable per booking.
                  </Text>
                </Stack>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <Stack spacing={3}>
                  <Text fontWeight="700">Booked slots</Text>
                  <Text fontSize="sm" color="gray.600">
                    Slots come from the /api/vehicles/:id/availability endpoint.
                  </Text>
                  <Box p={4} bg="#f1f5f9" borderRadius="12px">
                    <Text fontSize="sm">Jan 10, 10:00 - 14:00 (Booked)</Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>
        <GridItem>
          <Card position="sticky" top="100px">
            <CardBody>
              <Stack spacing={4}>
                <Text fontWeight="700">Pricing</Text>
                <HStack spacing={4}>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Hourly</Text>
                    <Text fontWeight="700">INR {vehicle.hourlyRate}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Daily</Text>
                    <Text fontWeight="700">INR {vehicle.dailyRate}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="xs" color="gray.500">Weekly</Text>
                    <Text fontWeight="700">INR {vehicle.weeklyRate}</Text>
                  </Box>
                </HStack>
                <Divider />
                <Stack spacing={3}>
                  <Input placeholder="Pickup location" />
                  <Input placeholder="Dropoff location" />
                  <Select>
                    <option>Hourly</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </Select>
                  <Input type="datetime-local" placeholder="Start time" />
                  <Input type="datetime-local" placeholder="End time" />
                  <Button size="lg">Book now</Button>
                  <Button variant="outline">Get quote</Button>
                </Stack>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      <Box mt={16}>
        <PageHeader title="Reviews" subtitle="Recent feedback from renters." />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </SimpleGrid>
        <Card mt={6}>
          <CardBody>
            <Stack spacing={3}>
              <Text fontWeight="700">Leave a review</Text>
              <Select placeholder="Rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </Select>
              <Input placeholder="Write a short comment" />
              <Button size="sm">Submit review</Button>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </AppLayout>
  );
}
