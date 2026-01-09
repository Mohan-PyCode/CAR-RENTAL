import { Box, Button, HStack, IconButton, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function NavBar() {
  return (
    <Box px={{ base: 4, md: 10 }} py={4} bg="white" borderBottom="1px solid #e5e7eb">
      <HStack justify="space-between">
        <HStack spacing={3} as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
          <Box w="36px" h="36px" bg="brand.500" borderRadius="10px" />
          <Text fontWeight="700" letterSpacing="0.4px">
            RoadReady
          </Text>
        </HStack>
        <HStack spacing={6} display={{ base: "none", md: "flex" }} fontSize="sm" color="gray.600">
          <Link as={RouterLink} to="/vehicles">Browse</Link>
          <Link as={RouterLink} to="/dashboard/customer">Customer</Link>
          <Link as={RouterLink} to="/dashboard/owner">Owner</Link>
          <Link as={RouterLink} to="/dashboard/admin">Admin</Link>
        </HStack>
        <Stack direction="row" spacing={3} align="center">
          <Button as={RouterLink} to="/login" variant="ghost">Login</Button>
          <Button as={RouterLink} to="/register">List your car</Button>
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            display={{ base: "inline-flex", md: "none" }}
          />
        </Stack>
      </HStack>
    </Box>
  );
}
