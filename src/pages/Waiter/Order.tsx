import { Box, Typography, Divider } from '@mui/material';
import OrdersList from '../../components/waiter/OrdersList';

const Order = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* My Orders Section - Theater 1 only */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Orders assigned to Theater 1
        </Typography>
        <OrdersList area="Theater 1" />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Other Orders Section - All except Theater 1 */}
      <Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', fontWeight: 'bold' }}>
          Other Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Orders from all other areas
        </Typography>
        <OrdersList excludeArea="Theater 1" />
      </Box>
    </Box>
  );
};

export default Order;
