import { Box, Container, Paper, Typography } from '@mui/material';
import type React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Home: React.FC = () => {
  const breadcrumbItems = [{ label: 'Home' }];

  return (
    <Container maxWidth="md">
      <Breadcrumbs items={breadcrumbItems} />
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to A11y Places
          </Typography>
          <Typography variant="body1" paragraph>
            This is an accessible places management application built with React, Material-UI, and
            Capacitor.
          </Typography>
          <Typography variant="body1" paragraph>
            Use the side menu to navigate to the Places section where you can add and manage your
            favorite places.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This app demonstrates accessibility best practices including:
          </Typography>
          <Box component="ul" sx={{ mt: 2 }}>
            <Typography component="li" variant="body2">
              Semantic HTML structure
            </Typography>
            <Typography component="li" variant="body2">
              ARIA labels for better screen reader support
            </Typography>
            <Typography component="li" variant="body2">
              Keyboard navigation
            </Typography>
            <Typography component="li" variant="body2">
              Responsive design with Material-UI
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
