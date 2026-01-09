import {
  Badge,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { ownerBookings, ownerVehicles } from "../data/mock.js";

export default function OwnerDashboard() {
  return (
    <AppLayout>
      <PageHeader title="Owner dashboard" subtitle="Listings, approvals, and payouts." />
      <Grid templateColumns={{ base: "1fr", lg: "1.4fr 0.8fr" }} gap={8}>
        <GridItem>
          <Stack spacing={8}>
            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="700">Your vehicles</Text>
                  <Button size="sm">Add vehicle</Button>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {ownerVehicles.map((vehicle) => (
                    <Card key={vehicle.id} variant="outline">
                      <CardBody>
                        <Stack spacing={2}>
                          <HStack justify="space-between">
                            <Text fontWeight="600">{vehicle.title}</Text>
                            <Badge colorScheme="green" borderRadius="full">
                              {vehicle.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">Next booking: {vehicle.nextBooking}</Text>
                          <Text fontSize="sm" color="gray.600">Revenue: INR {vehicle.revenue}</Text>
                          <HStack spacing={2}>
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">Images</Button>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Text fontWeight="700">Booking approvals</Text>
                  <Button size="sm" variant="outline">View all</Button>
                </HStack>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {ownerBookings.map((booking) => (
                    <Card key={booking.id} variant="outline">
                      <CardBody>
                        <Stack spacing={2}>
                          <HStack justify="space-between">
                            <Text fontWeight="600">{booking.vehicle}</Text>
                            <Badge colorScheme={booking.status === "pending" ? "orange" : "green"}>
                              {booking.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">{booking.customer}</Text>
                          <Text fontSize="sm" color="gray.600">{booking.slot}</Text>
                          <HStack spacing={2}>
                            <Button size="sm">Approve</Button>
                            <Button size="sm" variant="outline">Reject</Button>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
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
                <Text fontWeight="700">Add new vehicle</Text>
                <Input placeholder="Title" />
                <Input placeholder="Location" />
                <Input placeholder="Pickup location" />
                <Select>
                  <option>Vehicle type</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Pickup</option>
                </Select>
                <Select>
                  <option>Transmission</option>
                  <option>Automatic</option>
                  <option>Manual</option>
                </Select>
                <HStack>
                  <Input placeholder="Hourly rate" type="number" />
                  <Input placeholder="Daily rate" type="number" />
                </HStack>
                <Input placeholder="Weekly rate" type="number" />
                <Input placeholder="Delivery fee" type="number" />
                <Divider />
                <Text fontSize="sm" color="gray.600">Vehicle images</Text>
                <Button variant="outline">Upload images</Button>
                <Button size="sm">Save vehicle</Button>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </AppLayout>
  );
}
