import { Box, Typography, Divider, Alert, Button } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { LocationOn } from '@mui/icons-material';
import OrdersList from '../../components/waiter/OrdersList';
import { useWaiterStore } from '../../stores/waiterStore';

const Order = () => {
  const { assignedTheater, assignedTheaterId, isAssigned } = useWaiterStore();

  // If not assigned to any theater, show message with redirect
  if (!isAssigned || !assignedTheater) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <LocationOn sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Theater Assignment Required
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
          To view and manage orders, you need to be assigned to a theater area first. 
          Please select your theater assignment to get started.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 4, textAlign: 'left' }}>
          <Typography variant="body2">
            <strong>Why do I need a theater assignment?</strong><br />
            Orders are organized by theater areas to help you focus on your assigned section 
            and provide better service to customers in your area.
          </Typography>
        </Alert>

        <Button
          component={Link}
          to="/areas"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<LocationOn />}
          sx={{
            textTransform: 'none',
            fontSize: '1.1rem',
            py: 1.5,
            px: 4,
          }}
        >
          Select Theater Area
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* My Orders Section - Based on assigned theater */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Orders assigned to {assignedTheater.name}
        </Typography>
        <OrdersList theaterId={assignedTheaterId || undefined} theaterName={assignedTheater.name} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Other Orders Section - All except assigned theater */}
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
          Other Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Orders from all other areas
        </Typography>
        <OrdersList excludeTheaterId={assignedTheaterId || undefined} />
      </Box>
    </Box>
  );
};

export default Order;
