import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Modal,
} from "@mui/material";
import { useState } from "react";
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
  Close,
} from "@mui/icons-material";
import { useWaiterStore } from "../../stores/waiterStore";

interface OrderCardProps {
  orderId: number;
  variant?: "full" | "compact";
}

const OrderCard = ({ orderId, variant = "full" }: OrderCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { updateOrderStatus, orders } = useWaiterStore();

  // Get the order data from the store
  const order = orders.find((o) => o.id === orderId);

  // If order not found, show error
  if (!order) {
    return (
      <Box p={2}>
        <Typography color="error">Order #{orderId} not found</Typography>
      </Box>
    );
  }

  // For both variants, always use fresh data from store
  const displayOrder = order;

  // Single generic handler for all status updates
  const handleStatusUpdate = (newStatus: string, actionLabel: string) => {
    // Use setTimeout to break out of any potential form submission context
    setTimeout(async () => {
      console.log(`${actionLabel} button clicked for order:`, displayOrder.id);
      setIsUpdatingStatus(true);
      try {
        await updateOrderStatus(displayOrder.id, newStatus);
        console.log("Order status updated successfully");
      } catch (error) {
        console.error("Error updating order status:", error);
      } finally {
        setIsUpdatingStatus(false);
      }
    }, 0);
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return {
          color: "success" as const,
          icon: <CheckCircle fontSize="small" />,
          label: "Completed",
        };
      case "pending":
        return {
          color: "warning" as const,
          icon: <HourglassEmpty fontSize="small" />,
          label: "Pending",
        };
      case "preparing":
        return {
          color: "info" as const,
          icon: <Restaurant fontSize="small" />,
          label: "Preparing",
        };
      case "readyforguest":
        return {
          color: "warning" as const,
          icon: <NotificationImportant fontSize="small" />,
          label: "Ready for Guest",
        };
      case "cancelled":
        return {
          color: "error" as const,
          icon: <Cancel fontSize="small" />,
          label: "Cancelled",
        };
      case "inprogress":
        return {
          color: "info" as const,
          icon: <AccessTime fontSize="small" />,
          label: "In Progress",
        };
      case "new":
        return {
          color: "secondary" as const,
          icon: <FiberNew fontSize="small" />,
          label: "New Order",
        };
      case "problem":
        return {
          color: "error" as const,
          icon: <Warning fontSize="small" />,
          label: "Problem",
        };
      case "delivered":
        return {
          color: "success" as const,
          icon: <CheckCircle fontSize="small" />,
          label: "Delivered",
        };
      default:
        return {
          color: "default" as const,
          icon: <Assignment fontSize="small" />,
          label: status,
        };
    }
  };

  const formatTime = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "Awaiting pickup";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleString();
  };

  const getTotalAmount = () => {
    const subtotal = displayOrder.items.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return subtotal + displayOrder.tax + displayOrder.tip;
  };

  // Reusable button component
  const ActionButton = ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-block",
        px: 2,
        py: 1,
        backgroundColor: isUpdatingStatus ? "grey.400" : "error.main",
        color: "white",
        borderRadius: 1,
        cursor: isUpdatingStatus ? "not-allowed" : "pointer",
        fontSize: "0.875rem",
        fontWeight: 500,
        userSelect: "none",
        mr: 1,
        mb: 1,
        "&:hover": {
          backgroundColor: isUpdatingStatus ? "grey.400" : "error.dark",
        },
        "&:active": {
          backgroundColor: isUpdatingStatus ? "grey.400" : "error.darker",
        },
      }}
    >
      {isUpdatingStatus ? "Updating..." : label}
    </Box>
  );

  // Define available actions based on current status
  const getAvailableActions = () => {
    const actions = [];
    const status = displayOrder.status.toLowerCase();

    switch (status) {
      case "readyforguest":
        actions.push({
          onClick: () => handleStatusUpdate("pickedup", "Pick up"),
          label: "Pick up",
        });
        break;
      case "pickedup":
        actions.push({
          onClick: () => handleStatusUpdate("delivered", "Delivered"),
          label: "Delivered",
        });
        break;
      case "delivered":
        actions.push({
          onClick: () => handleStatusUpdate("completed", "Complete"),
          label: "Complete",
        });
        break;
      case "new":
        actions.push({
          onClick: () => handleStatusUpdate("readyforguest", "Ready for Guest"),
          label: "Ready for Guest",
        });
        break;
    }

    // Always show problem button unless status is already problem
    if (status !== "problem") {
      actions.push({
        onClick: () => handleStatusUpdate("problem", "Problem"),
        label: "Problem",
      });
    }

    return actions;
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Compact version for OrderRow
  if (variant === "compact") {
    return (
      <>
        <Card
          sx={{
            mb: 2,
            boxShadow: 1,
            cursor: "pointer",
            "&:hover": {
              boxShadow: 3,
              transform: "translateY(-1px)",
              transition: "all 0.2s ease-in-out",
            },
          }}
          onClick={handleOpenModal}
        >
          <CardContent sx={{ pb: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
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

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Location: {order.area} - {order.location}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
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
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              width: "800px",
              maxHeight: "800px",
              overflow: "auto",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "sticky",
                top: 0,
                bgcolor: "background.paper",
                zIndex: 1,
                p: 2,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Order Details</Typography>
              <Box
                component="button"
                onClick={handleCloseModal}
                sx={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  p: 1,
                  borderRadius: 1,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <Close />
              </Box>
            </Box>
            <Box sx={{ p: 0 }}>
              <OrderCard orderId={orderId} variant="full" />
            </Box>
          </Box>
        </Modal>
      </>
    );
  }

  // Full version (existing implementation)
  return (
    <Card sx={{ mb: 2, boxShadow: variant === "full" ? 0 : 2, border: "none" }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
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
              Location: {displayOrder.area} - {displayOrder.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Time: {formatTime(displayOrder.orderTime)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pickup Time: {formatTime(displayOrder.pickupTime)}
            </Typography>
            {getAvailableActions().length > 0 && (
              <Box mt={1}>
                {getAvailableActions().map((action, index) => (
                  <ActionButton
                    key={index}
                    onClick={action.onClick}
                    label={action.label}
                  />
                ))}
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
            maxHeight: "300px",
            overflow: "auto",
            p: 1,
            mb: 2,
          }}
        >
          {displayOrder.items.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
              mb={1}
            >
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
              <Typography variant="body2">${item.price.toFixed(2)}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Subtotal:</Typography>
            <Typography variant="body2">
              $
              {displayOrder.items
                .reduce((sum, item) => sum + item.price, 0)
                .toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tax:</Typography>
            <Typography variant="body2">
              ${displayOrder.tax.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2">Tip:</Typography>
            <Typography variant="body2">
              ${displayOrder.tip.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Typography variant="body1" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              ${getTotalAmount().toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
          <Typography variant="caption" color="text.secondary">
            {displayOrder.creditCard && displayOrder.creditCard.pan ? (
              <>
                Payment: ****{displayOrder.creditCard.pan.slice(-4)}(
                {displayOrder.creditCard.expiryMonth
                  ?.toString()
                  .padStart(2, "0") || "XX"}
                /{displayOrder.creditCard.expiryYear || "XXXX"})
              </>
            ) : (
              "Payment: No card information available"
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
