import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function BookingCheckout() {
  return (
    <AppLayout>
      <PageHeader title="Checkout" subtitle="Review the booking and pay securely." />
      <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={8}>
        <GridItem>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Text fontWeight="700">Booking details</Text>
                <HStack justify="space-between">
                  <Text>Vehicle</Text>
                  <Text fontWeight="600">Urban Glide Sedan</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Schedule</Text>
                  <Text fontWeight="600">Jan 15, 10:00 - 18:00</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Pickup</Text>
                  <Text fontWeight="600">Bandra Station</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Dropoff</Text>
                  <Text fontWeight="600">Mumbai Central</Text>
                </HStack>
                <Divider />
                <Text fontWeight="700">Customer</Text>
                <Input placeholder="Full name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card position="sticky" top="100px">
            <CardBody>
              <Stack spacing={3}>
                <Text fontWeight="700">Price summary</Text>
                <HStack justify="space-between">
                  <Text>Base price</Text>
                  <Text>INR 2,560</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Delivery fee</Text>
                  <Text>INR 200</Text>
                </HStack>
                <Divider />
                <HStack justify="space-between">
                  <Text fontWeight="700">Total</Text>
                  <Text fontWeight="700">INR 2,760</Text>
                </HStack>
                <Button as={RouterLink} to="/booking/success" size="lg">
                  Proceed to pay
                </Button>
                <Button variant="outline">Cancel booking</Button>
                <Box bg="#f1f5f9" p={4} borderRadius="12px">
                  <Text fontSize="sm" color="gray.600">
                    Payment updates arrive via /api/payments/webhook after Cashfree confirmation.
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </AppLayout>
  );
}
