import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { DataContext } from "../context/DataProvider";

const Address = () => {
  const navigate = useNavigate();
  const { setOpen } = useContext(DataContext);

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOpen(true); // open login popup
      navigate("/"); // redirect to home
    }
  }, []);

  const location = useLocation();
  const buyNowProduct = location.state?.product;

  const { cartItems } = useSelector((state) => state.cart);

  const getTotalAmount = () => {
    if (buyNowProduct) {
      return buyNowProduct.price.cost;
    }
    return cartItems.reduce((total, item) => total + item.price.cost, 0);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleContinue = async () => {
    if (
      !address.name ||
      !address.mobile ||
      !address.address ||
      !address.pincode
    ) {
      alert("Please fill all address fields");
      return;
    }
    try {

      localStorage.setItem("address", JSON.stringify(address));

      const totalAmount = getTotalAmount();

      // 1️⃣ Create order
      const response = await axios.post(
        "https://flipcart-backend-smop.onrender.com/razorpay/order",
        { amount: totalAmount },
      );

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_Sid9qPJUkEHCxN",
        amount: response.data.amount,
        currency: "INR",
        name: "Flipkart Clone",
        description: "Order Payment",
        order_id: response.data.id,

        handler: async function (res) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await axios.post(
              "https://flipcart-backend-smop.onrender.com/razorpay/verify",
              {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
                amount: totalAmount,
              },
            );

            if (verifyRes.data.success) {
              alert("Payment Successful ✅");
              navigate("/order-success");
            } else {
              alert("Payment Failed ❌");
            }
          } catch (error) {
            console.log("VERIFY ERROR ❌", error);
          }
        },

        prefill: {
          name: address.name,
          email: "test@gmail.com",
          contact: address.mobile,
        },

        theme: {
          color: "#2874f0",
        },
      };

      // 4️⃣ Open Razorpay
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("PAYMENT ERROR ❌", error);
    }
  };

  return (
    <Box
      style={{
        padding: 30,
        background: "#f1f3f6",
        minHeight: "100vh",
      }}
    >
      <Box
        style={{
          maxWidth: 600,
          margin: "auto",
          background: "#fff",
          padding: 20,
          borderRadius: 4,
        }}
      >
        <Typography variant="h6">Enter Delivery Address</Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Mobile Number"
          name="mobile"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          margin="normal"
          multiline
          rows={3}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Pincode"
          name="pincode"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          onClick={handleContinue}
          style={{
            marginTop: 20,
            background: "#fb641b",
            color: "#fff",
          }}
        >
          Continue to Payment
        </Button>
      </Box>
    </Box>
  );
};

export default Address;
