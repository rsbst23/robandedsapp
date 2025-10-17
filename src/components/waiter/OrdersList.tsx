import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Container, Pagination } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useWaiterStore } from '../../stores/waiterStore';
import OrderCard from './OrderCard';

interface OrdersListProps {
  area?: string;
  excludeArea?: string;
  ordersPerPage?: number;
}

const OrdersList = ({ area, excludeArea, ordersPerPage = 3 }: OrdersListProps) => {
  const { orders, loading, error, fetchOrders, clearError } = useWaiterStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter and sort orders by area or exclude area if props are provided
  const filteredOrders = useMemo(() => {
    let filtered = orders;
    
    // Include only specific area if provided
    if (area) {
      filtered = filtered.filter(order => order.area === area);
    }
    
    // Exclude specific area if provided
    if (excludeArea) {
      filtered = filtered.filter(order => order.area !== excludeArea);
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
  }, [orders, area, excludeArea]);

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
          {area 
            ? `Orders for ${area} (${filteredOrders.length})` 
            : excludeArea 
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
            {area 
              ? `No orders found for ${area}` 
              : excludeArea 
                ? `No orders found in other areas` 
                : 'No orders found'
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {excludeArea 
              ? `Orders from areas other than ${excludeArea} will appear here.`
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