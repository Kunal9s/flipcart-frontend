// import { Box, Typography, styled } from "@mui/material";
// import { useState, useEffect } from 'react';

// const Header = styled(Box)`
//     padding: 15px 24px;
//     background: #fff;
//     border-bottom: 1px solid #f0f0f0;
// `
// const Heading = styled(Box)`
//     color: #878787;
// `
// const Container = styled(Box)`
//     padding: 15px 14px;
//     background: #fff;
//     & > p {
//         margin-bottom: 20px;
//         font-size: 14px;
//     }
//     & > h6 {
//         margin-bottom: 20px;
//     }
// `
// const Price = styled(Box)`
//     float: right;
// `

// const Discount = styled(Typography)`
//     color: green;
//     font-weight: 500;
// `

// const TotalBill = ({ cartItems }) => {

//     const [price, setPrice] = useState(0);
//     const [discount, setDiscount] = useState(0);

//     useEffect(() => {
//         totalAmount()
//     },[cartItems]);

//     const totalAmount = () => {
//         let price = 0, discount = 0;
//         cartItems.map(item => {
//             price += item.price.mrp;
//             discount += (item.price.mrp - item.price.cost);
//         });
//         setPrice(price);
//         setDiscount(discount);
//     }

//     return (
//         <Box style={{ position: 'sticky', top: 80, padding: 16, borderRadius: 4 }}>
//             <Header>
//                 <Heading>PRICE DETAILS</Heading>
//             </Header>
//             <Container>
//                 <Typography>Price ({cartItems?.length} item)
//                     <Price component="span">₹{price}</Price>
//                 </Typography>
//                 <Typography>Discount
//                     <Price component="span">-₹{discount}</Price>
//                 </Typography>
//                 <Typography>Delivery Charges
//                     <Price component="span">₹40</Price>
//                 </Typography>
//                 <Typography variant="h6">Total Amount
//                     <Price component="span">₹{price - discount + 40}</Price>
//                 </Typography>
//                 <Discount>You will save ₹{discount - 40} on this order</Discount>
//             </Container>
//         </Box>
//     )
// }

// export default TotalBill;

import { Box, Typography, styled } from "@mui/material";
import { useState, useEffect } from 'react';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
    font-weight: 600;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    /* This ensures all direct children Typography components behave as flex containers */
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    & > h6 {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        border-top: 1px dashed #e0e0e0;
        padding: 20px 0;
    }
`;

const Price = styled(Box)`
    /* Removed float: right; replaced with flex logic in parent */
`;

const Discount = styled(Typography)`
    color: #388e3c; /* Exact Flipkart green */
    font-weight: 500;
    letter-spacing: -0.2px;
`;

const TotalBill = ({ cartItems }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems]);

    const totalAmount = () => {
        let price = 0, discount = 0;
        cartItems.forEach(item => {
            price += item.price.mrp;
            discount += (item.price.mrp - item.price.cost);
        });
        setPrice(price);
        setDiscount(discount);
    }

    return (
        // Added margin-top: 30px to match the Left Panel's Header margin
        <Box style={{ position: 'sticky', top: 80, marginTop: 30 }}>
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>
                    <span>Price ({cartItems?.length} item)</span>
                    <span>₹{price}</span>
                </Typography>
                <Typography>
                    <span>Discount</span>
                    <span style={{ color: '#388e3c' }}>-₹{discount}</span>
                </Typography>
                <Typography>
                    <span>Delivery Charges</span>
                    <span>₹40</span>
                </Typography>
                
                <Typography variant="h6">
                    <span>Total Amount</span>
                    <span>₹{price - discount + 40}</span>
                </Typography>

                <Discount>
                    You will save ₹{discount} on this order
                </Discount>
            </Container>
        </Box>
    )
}

export default TotalBill;