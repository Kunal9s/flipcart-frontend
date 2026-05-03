import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import api from "../utils/api";

const Payment = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector(s => s.cart);

    const total = cartItems.reduce((t, i) => t + i.price.cost, 0);
   
    const pay = async () => {
    const { data } = await api.post('/razorpay/order', { amount: total });

    const options = {
      key: "rzp_test_xxx",
      amount: data.amount,
      order_id: data.id,
      name: "Flipkart Clone",
      handler: async (res) => {
        const verify = await api.post('/razorpay/verify', {
          ...res, amount: total
        });
        if (verify.data.success) {
          await api.post('/orders', {
            items: cartItems,
            amount: total,
            address: JSON.parse(localStorage.getItem('address'))
          });
          navigate('/order-success');
        }
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, p: 2, bgcolor: '#fff' }}>
      <Typography variant="h6">Payment</Typography>
      <Button onClick={pay} variant="contained" sx={{ mt: 2 }}>
        Pay ₹{total}
      </Button>
    </Box>
  );
};

export default Payment;
