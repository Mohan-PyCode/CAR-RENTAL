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
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import { adminStats } from "../data/mock.js";

export default function AdminDashboard() {
  return (
    <AppLayout>
      <PageHeader title="Admin overview" subtitle="Platform metrics and payment monitoring." />
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
        {adminStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </SimpleGrid>
      <Grid templateColumns={{ base: "1fr", lg: "1.2fr 0.8fr" }} gap={8}>
        <GridItem>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Text fontWeight="700">Recent payments</Text>
                {[
                  "BK202501091530101ABCD - INR 2,760 - success",
                  "BK20250108101010PQRSZ - INR 1,800 - pending",
                ].map((item) => (
                  <Box key={item} p={3} border="1px solid #e5e7eb" borderRadius="12px">
                    <Text fontSize="sm">{item}</Text>
                  </Box>
                ))}
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card>
            <CardBody>
              <Stack spacing={4}>
                <Text fontWeight="700">Webhook tester</Text>
                <Text fontSize="sm" color="gray.600">
                  Simulate /api/payments/webhook updates during development.
                </Text>
                <Input placeholder="Booking ID" />
                <Input placeholder="Reference ID" />
                <Input placeholder="Status" />
                <Button size="sm">Send webhook</Button>
                <Divider />
                <HStack justify="space-between">
                  <Text fontSize="sm">Last response</Text>
                  <Text fontSize="sm" color="gray.600">200 OK</Text>
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </AppLayout>
  );
}
