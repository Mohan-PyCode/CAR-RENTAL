import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout.jsx";
import BookingCard from "../components/BookingCard.jsx";
import PageHeader from "../components/PageHeader.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { bookings, vehicles } from "../data/mock.js";

export default function CustomerDashboard() {
  return (
    <AppLayout>
      <PageHeader title="Customer dashboard" subtitle="Bookings, favorites, and profile." />
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        <GridItem>
          <Stack spacing={8}>
            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="700">Upcoming bookings</Text>
                  <Button size="sm" variant="outline">View all</Button>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {bookings.slice(0, 1).map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                  <Card variant="outline">
                    <CardBody>
                      <Text fontWeight="600">No active booking</Text>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        Browse cars to plan your next trip.
                      </Text>
                      <Button size="sm" mt={3}>Browse cars</Button>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="700">Previous bookings</Text>
                  <Button size="sm" variant="outline">Download receipts</Button>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="700">Favorites</Text>
                  <Button size="sm" variant="outline">Manage</Button>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>
          </Stack>
        </GridItem>
        <GridItem>
          <Card position="sticky" top="100px">
            <CardBody>
              <Stack spacing={4}>
                <Text fontWeight="700">Profile</Text>
                <Input placeholder="Full name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
                <Button size="sm">Save changes</Button>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </AppLayout>
  );
}
