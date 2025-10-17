import { useEffect, useMemo, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Button, Container, Pagination, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useWaiterStore } from '../../stores/waiterStore';
import OrderCard from './OrderCard';

interface OrdersListProps {
  theaterId?: number;
  excludeTheaterId?: number;
  theaterName?: string;
  ordersPerPage?: number;
}

const OrdersList = ({ theaterId, excludeTheaterId, theaterName, ordersPerPage = 5 }: OrdersListProps) => {
  const { orders, loading, error, fetchOrders, clearError, statusFilter, setStatusFilter } = useWaiterStore();
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
    
    // Filter by status if a specific status is selected
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());
    }
    
    return filtered;
  }, [orders, theaterId, excludeTheaterId, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when filtered orders change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredOrders.length]);

  // Get unique statuses for filter dropdown
  const availableStatuses = useMemo(() => {
    const statuses = new Set(orders.map(order => order.status.toLowerCase()));
    return Array.from(statuses).sort();
  }, [orders]);

  const handleRefresh = (event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    clearError();
    fetchOrders();
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleStatusFilterChange = (event: any) => {
    setStatusFilter(event.target.value as string);
  };

  // Format status names for display in the filter dropdown
  const formatStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'readyforguest':
        return 'Ready for Guest';
      case 'inprogress':
        return 'In Progress';
      case 'new':
        return 'New Order';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
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
            <Button color="inherit" size="small" onClick={handleRefresh} type="button">
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
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={statusFilter}
              label="Status Filter"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {formatStatusLabel(status)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />} 
            onClick={handleRefresh}
            disabled={loading}
            type="button"
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {filteredOrders.length === 0 ? (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No orders found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {statusFilter !== 'all' ? (
              `Try selecting a different status filter or "All Statuses" to see more orders.`
            ) : excludeTheaterId ? (
              `Orders from areas other than Theater ${excludeTheaterId} will appear here.`
            ) : (
              'Orders will appear here when customers place them.'
            )}
          </Typography>
        </Box>
      ) : (
        <Box>
          {paginatedOrders.map((order) => (
            <OrderCard key={order.id} order={order} variant="compact" />
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