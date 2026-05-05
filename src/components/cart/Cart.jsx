// import { Typography, Grid, Box, Button, styled } from "@mui/material";
// import { useSelector } from "react-redux";
// import CartItem from "./CartItem";
// import TotalBill from "./TotalBill";
// import EmptyCart from "./EmptyCart";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Header = styled(Box)`
//   padding: 15px 24px;
//   margin-top: 30px;
//   background: #fff;
//   border-radius: 4px;
// `;
// const ButtonWrapper = styled(Box)`
//   padding: 16px 22px;
//   background: #fff;
//   box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
//   display: flex;
//   justify-content: flex-end;
//   border-radius: 0 0 4px 4px;
// `;

// const Cart = () => {
//   const navigate = useNavigate();

//   const { cartItems } = useSelector((state) => state.cart);

//   const getTotalAmount = () => {
//     return cartItems.reduce((total, item) => total + item.price.cost, 0);
//   };

//   const placeOrder = async () => {
//     const totalAmount = getTotalAmount();

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/razorpay/order",
//         { amount: totalAmount },
//       );

//       const options = {
//         key: "rzp_test_Sid9qPJUkEHCxN",
//         amount: response.data.amount,
//         currency: "INR",
//         name: "Flipkart Clone",
//         description: "Order Payment",
//         order_id: response.data.id,

//         handler: async function (response) {
//           try {
//             const verifyRes = await axios.post(
//               "http://localhost:8000/razorpay/verify",
//               {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 amount: totalAmount,
//               },
//             );

//             if (verifyRes.data.success) {
//               alert("Payment Successful ✅");
//               navigate("/order-success");
//             } else {
//               alert("Payment Failed ❌");
//             }
//           } catch (error) {
//             console.log("VERIFY ERROR ❌", error);
//           }
//         },

//         prefill: {
//           name: "Kunal",
//           email: "test@gmail.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#2874f0",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.log("ORDER ERROR ❌", error);
//     }
//   };

//   return (
//     <Box style={{ background: "#f1f3f6", minHeight: "100vh", paddingTop: 20, display: 'flex', justifyContent: 'center' }}>
//       {cartItems.length ? (
//         <Grid container justifyContent="center">
//           <Grid
//             container
//             style={{
//               maxWidth: 1200,
//               width: '100%',
//               margin: "55px auto",
//               gap: 20,
//               alignItems: 'flex-start'
//             }}
//           >
//             <Grid item lg={8} md={8} sm={12} xs={12}>
//               <Header>
//                 <Typography>My Cart ({cartItems.length})</Typography>
//               </Header>
//               {cartItems.map((item) => (
//                 <CartItem key={item.id} item={item} />
//               ))}
//               <ButtonWrapper>
//                 <Button
//                   variant="contained"
//                   onClick={placeOrder}
//                   style={{
//                     background: "#fb641b",
//                     color: "#fff",
//                     padding: "10px 60px",
//                     borderRadius: 2,
//                     fontSize: 16,
//                   }}
//                 >
//                   Place Order
//                 </Button>
//               </ButtonWrapper>
//             </Grid>
//             <Grid item lg={4} md={4} sm={12} xs={12}>
//               <TotalBill cartItems={cartItems} />
//             </Grid>
//           </Grid>
//         </Grid>
//       ) : (
//         <EmptyCart />
//       )}
//     </Box>
//   );
// };

import { Typography, Grid, Box, Button, theme, styled } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalBill from "./TotalBill";
import EmptyCart from "./EmptyCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const Header = styled(Box)`
  padding: 15px 24px;
  margin-top: 30px;
  background: #fff;
  border-radius: 4px;
`;
const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  display: flex;
  justify-content: flex-end;
  border-radius: 0 0 4px 4px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const { setLoginOpen, setDrawerOpen } = useContext(DataContext);

  const { cartItems } = useSelector((state) => state.cart);

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price.cost, 0);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("token");
    const totalAmount = getTotalAmount();

    try {
      const response = await axios.post(
        "https://flipcart-backend-smop.onrender.com/razorpay/order",
        { amount: totalAmount },
      );

      const options = {
        key: "rzp_test_Sid9qPJUkEHCxN",
        amount: response.data.amount,
        currency: "INR",
        name: "Flipkart Clone",
        description: "Order Payment",
        order_id: response.data.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "https://flipcart-backend-smop.onrender.com/razorpay/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: totalAmount,
              },
            );

            if (verifyRes.data.success) {
              // alert("Payment Successful ✅");
              navigate("/order-success");
            } else {
              alert("Payment Failed ❌");
            }
          } catch (error) {
            console.log("VERIFY ERROR ❌", error);
          }
        },

        prefill: {
          name: "Kunal",
          email: "test@gmail.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2874f0",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("ORDER ERROR ❌", error);
    }
  };

  const Container = styled(Grid)(({ theme }) => ({
    padding: "30px 135px", // Standard Flipkart-style horizontal breathing room
    display: "flex",
    [theme.breakpoints.down("md")]: {
      padding: "15px 0",
    },
  }));

  const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down("md")]: {
      marginBottom: 15,
      paddingRight: 0,
    },
  }));

  return (
    <Box style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      {cartItems.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems.length})
              </Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
            <ButtonWrapper>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("place order clicked");
                  const token = localStorage.getItem("token");

                  if (!token) {
                    setDrawerOpen(false); 
                    setLoginOpen(true);
                    return;
                  }

                  navigate("/address");
                }}
                style={{
                  background: "#fb641b",
                  color: "#fff",
                  width: 250,
                  height: 51,
                  borderRadius: 2,
                }}
              >
                Place Order
              </Button>
            </ButtonWrapper>
          </LeftComponent>

          {/* Right Panel: Total Bill */}
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalBill cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </Box>
  );
};

export default Cart;
