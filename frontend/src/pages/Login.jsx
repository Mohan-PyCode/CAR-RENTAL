import { Box, Button, Card, CardBody, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Login() {
  return (
    <AppLayout>
      <PageHeader title="Sign in" subtitle="Access your bookings and listings." />
      <Card maxW="480px">
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter password" />
            </FormControl>
            <Button size="lg">Sign in</Button>
            <Box>
              <Text fontSize="sm" color="gray.600">
                New here? <RouterLink to="/register">Create an account</RouterLink>
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
