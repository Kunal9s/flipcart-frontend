import { Box, Typography } from "@mui/material";

const OrderSuccess = () => {
  return (
    <Box style={{ padding: 50, textAlign: "center" }}>
      <Typography variant="h4">🎉 Order Placed Successfully!</Typography>
      <Typography>Your payment was successful.</Typography>
    </Box>
  );
};

export default OrderSuccess;