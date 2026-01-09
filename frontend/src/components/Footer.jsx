import { Box, HStack, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box borderTop="1px solid #e5e7eb" py={8} px={{ base: 4, md: 10 }} bg="white">
      <HStack justify="space-between" flexWrap="wrap" spacing={4}>
        <Text fontSize="sm">RoadReady Rentals UI Kit</Text>
        <HStack spacing={6} fontSize="sm">
          <Link>Terms</Link>
          <Link>Privacy</Link>
          <Link>Support</Link>
        </HStack>
      </HStack>
    </Box>
  );
}
