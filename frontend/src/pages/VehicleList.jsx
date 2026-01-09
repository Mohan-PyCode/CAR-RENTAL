import {
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  SimpleGrid,
  StackDivider,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { vehicles } from "../data/mock.js";

export default function VehicleList() {
  return (
    <AppLayout>
      <PageHeader title="Browse cars" subtitle="Compare availability, price, and pickup options." />
      <Grid templateColumns={{ base: "1fr", lg: "320px 1fr" }} gap={8}>
        <GridItem>
          <Box bg="white" p={6} borderRadius="16px" border="1px solid #e5e7eb">
            <Stack spacing={4} divider={<StackDivider borderColor="#e5e7eb" />}>
              <Text fontWeight="700">Filters</Text>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.600">Search</Text>
                <Input placeholder="Model, brand, or city" />
                <Input placeholder="Pickup location" />
              </Stack>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.600">Date & time</Text>
                <Input placeholder="Start" type="datetime-local" />
                <Input placeholder="End" type="datetime-local" />
                <Checkbox>Show only available</Checkbox>
              </Stack>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.600">Vehicle type</Text>
                <Stack spacing={1}>
                  {["Sedan", "SUV", "Hatchback", "Coupe", "Pickup"].map((type) => (
                    <Checkbox key={type}>{type}</Checkbox>
                  ))}
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.600">Transmission</Text>
                <Stack spacing={1}>
                  <Checkbox>Automatic</Checkbox>
                  <Checkbox>Manual</Checkbox>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.600">Seats</Text>
                <HStack>
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </HStack>
              </Stack>
              <Stack spacing={2}>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">Hourly rate</Text>
                  <Badge>INR 200 - INR 600</Badge>
                </HStack>
                <HStack>
                  <Input placeholder="Min" type="number" />
                  <Input placeholder="Max" type="number" />
                </HStack>
              </Stack>
              <HStack>
                <Button size="sm">Apply filters</Button>
                <Button size="sm" variant="outline">Reset</Button>
              </HStack>
              <Text fontSize="xs" color="gray.500">Filter options are fetched from the /api/filters endpoint.</Text>
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <HStack justify="space-between" mb={4} flexWrap="wrap" spacing={3}>
            <Text fontWeight="600">{vehicles.length} cars found</Text>
            <Select maxW="200px">
              <option>Sort by</option>
              <option>Price</option>
              <option>Newest</option>
              <option>Rating</option>
            </Select>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </AppLayout>
  );
}
