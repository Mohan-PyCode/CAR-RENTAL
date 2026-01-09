import { Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";

export default function StatCard({ label, value }) {
  return (
    <Card>
      <CardBody>
        <VStack align="start" spacing={1}>
          <Text fontSize="sm" color="gray.500">
            {label}
          </Text>
          <Heading size="lg">{value}</Heading>
        </VStack>
      </CardBody>
    </Card>
  );
}
