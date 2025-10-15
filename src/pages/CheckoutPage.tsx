import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface CartItem {
  id: number;
  item: string;
  price: number;
  quantity: number;
  total: number;
}

const CheckoutPage = () => {
  // Mock cart data - replace with actual cart state/store
  const cartItems: CartItem[] = [
    { id: 1, item: "3", price: 10.75, quantity: 1, total: 10.75 },
    { id: 2, item: "4", price: 10.75, quantity: 1, total: 10.75 },
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.total, 0);

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log("Processing purchase...");
  };

  return (
    <Box sx={{ padding: "40px", maxWidth: "800px" }}>
      {/* Page Title */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontSize: "4rem",
          fontWeight: "normal",
          marginBottom: "40px",
          color: "#333",
        }}
      >
        Checkout
      </Typography>

      {/* Cart Description */}
      <Typography
        variant="h6"
        sx={{
          marginBottom: "30px",
          color: "#666",
          fontSize: "1.1rem",
        }}
      >
        Here's the stuff in your cart
      </Typography>

      {/* Cart Table */}
      <TableContainer
        component={Paper}
        sx={{
          marginBottom: "30px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold", color: "#666" }}>
                Item
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#666" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#666" }}>
                Quantity
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#666" }}>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={{ fontSize: "1.1rem" }}>{item.item}</TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  {item.quantity}
                </TableCell>
                <TableCell sx={{ fontSize: "1.1rem" }}>
                  ${item.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            {/* Total Row */}
            <TableRow sx={{ borderTop: "2px solid #e0e0e0" }}>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {totalQuantity}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                ${totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Purchase Button */}
      <Button
        variant="contained"
        onClick={handlePurchase}
        sx={{
          backgroundColor: "#9c27b0",
          color: "white",
          padding: "12px 30px",
          fontSize: "1.1rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          "&:hover": {
            backgroundColor: "#7b1fa2",
          },
        }}
      >
        BUY
      </Button>
    </Box>
  );
};

export default CheckoutPage;
