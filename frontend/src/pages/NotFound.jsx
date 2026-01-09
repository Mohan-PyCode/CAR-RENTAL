import { Button, Card, CardBody, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";

export default function NotFound() {
  return (
    <AppLayout>
      <Card maxW="560px" mx="auto">
        <CardBody>
          <Stack spacing={4} textAlign="center">
            <Text fontSize="2xl" fontWeight="700">Page not found</Text>
            <Text color="gray.600">This view is not wired yet. Use the navigation to continue.</Text>
            <Button as={RouterLink} to="/">Back home</Button>
          </Stack>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
