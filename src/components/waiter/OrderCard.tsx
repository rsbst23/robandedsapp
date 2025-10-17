import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';
import { 
  CheckCircle, 
  HourglassEmpty, 
  Restaurant, 
  Cancel, 
  AccessTime,
  Assignment,
  FiberNew,
  NotificationImportant,
  Warning
} from '@mui/icons-material';
import type { Order } from '../../types/types';

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { color: 'success' as const, icon: <CheckCircle fontSize="small" />, label: 'Completed' };
      case 'pending':
        return { color: 'warning' as const, icon: <HourglassEmpty fontSize="small" />, label: 'Pending' };
      case 'preparing':
        return { color: 'info' as const, icon: <Restaurant fontSize="small" />, label: 'Preparing' };
      case 'readyforguest':
        return { color: 'warning' as const, icon: <NotificationImportant fontSize="small" />, label: 'Ready for Guest' };
      case 'cancelled':
        return { color: 'error' as const, icon: <Cancel fontSize="small" />, label: 'Cancelled' };
      case 'inprogress':
        return { color: 'info' as const, icon: <AccessTime fontSize="small" />, label: 'In Progress' };
      case 'new':
        return { color: 'secondary' as const, icon: <FiberNew fontSize="small" />, label: 'New Order' };
      case 'problem':
        return { color: 'error' as const, icon: <Warning fontSize="small" />, label: 'Problem' };
      default:
        return { color: 'default' as const, icon: <Assignment fontSize="small" />, label: status };
    }
  };

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'Awaiting pickup';
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return date.toLocaleString();
  };

  const getTotalAmount = () => {
    const subtotal = order.items.reduce((sum, item) => sum + item.price, 0);
    return subtotal + order.tax + order.tip;
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Order #{order.id}
          </Typography>
          <Chip 
            icon={getStatusConfig(order.status).icon}
            label={getStatusConfig(order.status).label} 
            color={getStatusConfig(order.status).color}
            variant="filled"
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Location: {order.area} - {order.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Time: {formatTime(order.orderTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pickup Time: {formatTime(order.pickupTime)}
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography variant="h6" color="primary">
              ${getTotalAmount().toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          Items ({order.items.length}):
        </Typography>
        
        {order.items.map((item) => (
          <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
            <Box>
              <Typography variant="body2">
                Item #{item.itemId} - {item.firstName}
              </Typography>
              {item.notes && (
                <Typography variant="caption" color="text.secondary">
                  Notes: {item.notes}
                </Typography>
              )}
            </Box>
            <Typography variant="body2">
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
        ))}
        
        <Divider sx={{ my: 1 }} />
        
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">
              ${order.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tax:</Typography>
            <Typography variant="body2">${order.tax.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tip:</Typography>
            <Typography variant="body2">${order.tip.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Typography variant="body1" fontWeight="bold">Total:</Typography>
            <Typography variant="body1" fontWeight="bold">
              ${getTotalAmount().toFixed(2)}
            </Typography>
          </Box>
        </Box>
        
        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            {order.creditCard && order.creditCard.pan ? (
              <>
                Payment: ****{order.creditCard.pan.slice(-4)} 
                ({order.creditCard.expiryMonth?.toString().padStart(2, '0') || 'XX'}/{order.creditCard.expiryYear || 'XXXX'})
              </>
            ) : (
              'Payment: No card information available'
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;