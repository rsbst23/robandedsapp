import { Card, CardContent, Typography, Box, Chip, Divider, Modal, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  HourglassEmpty, 
  Restaurant, 
  Cancel, 
  AccessTime,
  Assignment,
  FiberNew,
  NotificationImportant,
  Warning,
  Close
} from '@mui/icons-material';
import type { Order } from '../../types/types';
import { useWaiterStore } from '../../stores/waiterStore';

interface OrderCardProps {
  orderId?: number;
  order?: Order;
  variant?: 'full' | 'compact';
}

const OrderCard = ({ orderId, order: propOrder, variant = 'full' }: OrderCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [order, setOrder] = useState<Order | null>(propOrder || null);
  const [loading, setLoading] = useState(!propOrder);
  const [error, setError] = useState<string | null>(null);
  
  // Get updateOrder function from waiterStore
  const { orders, setOrders } = useWaiterStore();

  // Fetch order data when component mounts or orderId changes (only if order not provided as prop)
  useEffect(() => {
    if (propOrder) {
      // If order is provided as prop, use it directly
      setOrder(propOrder);
      setLoading(false);
      return;
    }

    if (!orderId) {
      setError('No order ID or order data provided');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3008/orders/${orderId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch order: ${response.statusText}`);
        }
        const orderData: Order = await response.json();
        setOrder(orderData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, propOrder]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <Box p={2} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size={40} />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Loading order #{orderId || '...'}...
        </Typography>
      </Box>
    );
  }

  // Show error if fetch failed
  if (error || !order) {
    return (
      <Box p={2}>
        <Typography color="error">
          {error || `Order #${orderId || 'unknown'} not found`}
        </Typography>
      </Box>
    );
  }

  // For both variants, use the fetched order data
  const displayOrder = order;

  const handleStatusUpdate = async (newStatus: string) => {
    console.log(`Updating order ${displayOrder.id} status to:`, newStatus);
    setIsUpdatingStatus(true);
    try {
      const response = await fetch(`http://localhost:3008/orders/${displayOrder.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.statusText}`);
      }

      // Update local state after successful API call
      const updatedOrder = { ...displayOrder, status: newStatus };
      setOrder(updatedOrder);
      
      // Only update the global store if this card was created from OrdersList (has propOrder)
      // Individual cards (orderId only) should not update global store to avoid conflicts
      if (propOrder && orders.length > 0) {
        setOrders(orders.map(order => 
          order.id === displayOrder.id ? updatedOrder : order
        ));
      }
      
      console.log('Order status updated successfully to:', newStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
      setError(error instanceof Error ? error.message : 'Failed to update order status');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleProblemClick = () => handleStatusUpdate('problem');

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
    const subtotal = displayOrder.items.reduce((sum, item) => sum + item.price, 0);
    return subtotal + displayOrder.tax + displayOrder.tip;
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    // If this card was created from OrdersList (has propOrder), 
    // trigger a refresh to get updated data from the server
    if (propOrder && orders.length > 0) {
      // Re-fetch the order data to get the latest status
      const fetchUpdatedOrder = async () => {
        try {
          const response = await fetch(`http://localhost:3008/orders/${order.id}`);
          if (response.ok) {
            const updatedOrder: Order = await response.json();
            // Update the global store with fresh data
            setOrders(orders.map(o => 
              o.id === order.id ? updatedOrder : o
            ));
          }
        } catch (error) {
          console.error('Error fetching updated order:', error);
        }
      };
      fetchUpdatedOrder();
    }
  };

  // Compact version for OrderRow
  if (variant === 'compact') {
    return (
      <>
        <Card 
          sx={{ 
            mb: 2, 
            boxShadow: 1, 
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 3,
              transform: 'translateY(-1px)',
              transition: 'all 0.2s ease-in-out'
            }
          }}
          onClick={handleOpenModal}
        >
        <CardContent sx={{ pb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Typography variant="h6" component="h3">
                  Order #{order.id}
                </Typography>
                <Chip 
                  icon={getStatusConfig(order.status).icon}
                  label={getStatusConfig(order.status).label} 
                  color={getStatusConfig(order.status).color}
                  variant="filled"
                  size="small"
                />
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Location: {order.location}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Order Time: {formatTime(order.orderTime)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pickup Time: {formatTime(order.pickupTime)}
              </Typography>
            </Box>
            
            <Box textAlign="right" ml={2}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                ${getTotalAmount().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        </Card>

        {/* Modal for full order details */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              width: '800px',
              maxHeight: '800px',
              overflow: 'auto',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 0,
                bgcolor: 'background.paper',
                zIndex: 1,
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h6">Order Details</Typography>
              <Box
                component="button"
                onClick={handleCloseModal}
                sx={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  p: 1,
                  borderRadius: 1,
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Close />
              </Box>
            </Box>
            <Box sx={{ p: 0 }}>
              <OrderCard orderId={order.id} variant="full" />
            </Box>
          </Box>
        </Modal>
      </>
    );
  }

  // Full version (existing implementation)
  return (
    <Card sx={{ mb: 2, boxShadow: variant === 'full' ? 0 : 2, border: 'none' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Order #{displayOrder.id}
          </Typography>
          <Chip 
            icon={getStatusConfig(displayOrder.status).icon}
            label={getStatusConfig(displayOrder.status).label} 
            color={getStatusConfig(displayOrder.status).color}
            variant="filled"
          />
        </Box>
        
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Location: {displayOrder.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Time: {formatTime(displayOrder.orderTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pickup Time: {formatTime(displayOrder.pickupTime)}
            </Typography>
            {displayOrder.status.toLowerCase() !== 'problem' && (
              <Box mt={1}>
                <Box
                  onClick={handleProblemClick}
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 1,
                    backgroundColor: isUpdatingStatus ? 'grey.400' : 'error.main',
                    color: 'white',
                    borderRadius: 1,
                    cursor: isUpdatingStatus ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    userSelect: 'none',
                    '&:hover': {
                      backgroundColor: isUpdatingStatus ? 'grey.400' : 'error.dark',
                    },
                    '&:active': {
                      backgroundColor: isUpdatingStatus ? 'grey.400' : 'error.darker',
                    }
                  }}
                >
                  {isUpdatingStatus ? 'Updating...' : 'Problem'}
                </Box>
              </Box>
            )}
          </Box>
          <Box textAlign="right">
            <Typography variant="h6" color="primary">
              ${getTotalAmount().toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          Items ({displayOrder.items.length}):
        </Typography>
        
        <Box 
          sx={{ 
            maxHeight: '300px', 
            overflow: 'auto',
            p: 1,
            mb: 2
          }}
        >
          {displayOrder.items.map((item) => (
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
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">
              ${displayOrder.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tax:</Typography>
            <Typography variant="body2">${displayOrder.tax.toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tip:</Typography>
            <Typography variant="body2">${displayOrder.tip.toFixed(2)}</Typography>
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
            {displayOrder.creditCard && displayOrder.creditCard.pan ? (
              <>
                Payment: ****{displayOrder.creditCard.pan.slice(-4)} 
                ({displayOrder.creditCard.expiryMonth?.toString().padStart(2, '0') || 'XX'}/{displayOrder.creditCard.expiryYear || 'XXXX'})
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