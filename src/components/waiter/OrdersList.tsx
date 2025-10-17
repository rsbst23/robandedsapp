import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Container, Pagination } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useWaiterStore } from '../../stores/waiterStore';
import OrderCard from './OrderCard';

interface OrdersListProps {
  theaterId?: number;
  excludeTheaterId?: number;
  theaterName?: string;
  ordersPerPage?: number;
}

const OrdersList = ({ theaterId, excludeTheaterId, theaterName, ordersPerPage = 3 }: OrdersListProps) => {
  const { orders, loading, error, fetchOrders, clearError } = useWaiterStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter and sort orders by theater ID if provided
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    
    // Convert theater ID to area string format if provided
    const theaterArea = theaterId ? `Theater ${theaterId}` : undefined;
    const excludeTheaterArea = excludeTheaterId ? `Theater ${excludeTheaterId}` : undefined;
    
    // Include only specific theater if provided
    if (theaterArea) {
      filtered = filtered.filter(order => order.area === theaterArea);
    }
    
    // Exclude specific theater if provided
    if (excludeTheaterArea) {
      filtered = filtered.filter(order => order.area !== excludeTheaterArea);
    }
    
    // Sort orders by priority: problem, new, readyforguest, then others
    const getStatusPriority = (status: string) => {
      switch (status.toLowerCase()) {
        case 'problem': return 1;
        case 'new': return 2;
        case 'readyforguest': return 3;
        case 'completed': return 4;
        case 'cancelled': return 5;
        case 'preparing': return 6;
        case 'inprogress': return 7;
        case 'pending': return 8;
        default: return 9;
      }
    };
    
    filtered.sort((a, b) => {
      const priorityA = getStatusPriority(a.status);
      const priorityB = getStatusPriority(b.status);
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same priority, sort by order time (newest first)
      return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime();
    });
    
    return filtered;
  }, [orders, theaterId, excludeTheaterId]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filtered orders change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredOrders.length]);

  const handleRefresh = () => {
    clearError();
    fetchOrders();
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading orders...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              Try Again
            </Button>
          }
        >
          Error loading orders: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {theaterId
            ? `Orders for ${theaterName || `Theater ${theaterId}`} (${filteredOrders.length})` 
            : excludeTheaterId
              ? `Other Areas (${filteredOrders.length})` 
              : `Orders (${filteredOrders.length})`
          }
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<Refresh />} 
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {filteredOrders.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            {theaterId
              ? `No orders found for ${theaterName || `Theater ${theaterId}`}` 
              : excludeTheaterId
                ? `No orders found in other areas` 
                : 'No orders found'
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {excludeTheaterId
              ? `Orders from areas other than Theater ${excludeTheaterId} will appear here.`
              : 'Orders will appear here when customers place them.'
            }
          </Typography>
        </Box>
      ) : (
        <Box>
          {paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default OrdersList;