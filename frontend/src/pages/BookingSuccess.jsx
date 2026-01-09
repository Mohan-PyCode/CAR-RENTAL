import { Box, Button, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";

export default function BookingSuccess() {
  return (
    <AppLayout>
      <Card maxW="600px" mx="auto">
        <CardBody>
          <Stack spacing={4} textAlign="center">
            <Text fontSize="2xl" fontWeight="700">Payment initiated</Text>
            <Text color="gray.600">
              Booking is pending confirmation. You will receive updates once payment is verified.
            </Text>
            <Box bg="#f1f5f9" p={4} borderRadius="12px">
              <Text fontSize="sm" color="gray.600">Booking ID: BK202501091530101ABCD</Text>
            </Box>
            <Button as={RouterLink} to="/dashboard/customer">
              Go to dashboard
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
