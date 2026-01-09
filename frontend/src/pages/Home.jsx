import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import { vehicles } from "../data/mock.js";

export default function Home() {
  return (
    <AppLayout>
      <Box mt={1}>
        <PageHeader title="Featured listings" subtitle="Popular cars with strong availability and ratings." />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={16}>
        <PageHeader title="Why owners list here" subtitle="Clear pricing controls and flexible approvals." />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {[
            "Set hourly, daily, and weekly rates",
            "Approve or reject bookings in one click",
            "Upload images and track performance",
          ].map((item) => (
            <Card key={item}>
              <CardBody>
                <Text fontWeight="600">{item}</Text>
                <Text mt={2} color="gray.600" fontSize="sm">
                  Built to map directly to your API endpoints and admin flows.
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </AppLayout>
  );
}
