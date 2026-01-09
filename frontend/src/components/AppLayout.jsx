import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Footer from "./Footer.jsx";
import NavBar from "./NavBar.jsx";

export default function AppLayout({ children }) {
  return (
    <Box minH="100vh" position="relative" bg="linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)">
      <Box position="relative" zIndex={1}>
        <NavBar />
        <Container
          as={motion.div}
          maxW="6xl"
          py={{ base: 6, md: 12 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  );
}
