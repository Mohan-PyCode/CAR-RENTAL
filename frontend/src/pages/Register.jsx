import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AppLayout from "../components/AppLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Register() {
  return (
    <AppLayout>
      <PageHeader title="Create account" subtitle="Register as a customer or vehicle owner." />
      <Card maxW="520px">
        <CardBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input placeholder="name@example.com" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Create password" />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input placeholder="+91 98765 43210" />
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select>
                <option>Customer</option>
                <option>Owner</option>
              </Select>
            </FormControl>
            <Button size="lg">Create account</Button>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Already registered? <RouterLink to="/login">Sign in</RouterLink>
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
