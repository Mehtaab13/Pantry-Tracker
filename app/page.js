'use client'
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/inventory'); // Navigate to the page component
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="black"
    >
      <Typography variant="h2" color="white" gutterBottom>
        Welcome to the Inventory App
      </Typography>
      <Button variant="contained" onClick={handleGetStarted}>
        Get Started
      </Button>
    </Box>
  );
}