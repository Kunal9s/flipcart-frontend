import { Typography, Box, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';

import { LocalOffer as Badge } from '@mui/icons-material';

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const StyleBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`

const ColumnText = styled(TableRow)`
    vertical-align: baseline;   
    font-size: 14px;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border: none;
    }
`

const ProductDetails = ({ product }) => {

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000 ));

    return (
            <>
                <Typography>Available Offers</Typography>
                <SmallText>
                    <Typography><StyleBadge />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C</Typography>
                    <Typography><StyleBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, T&C</Typography>
                    <Typography><StyleBadge />Sign up for Flipkart Pay Later and get Flipcart Gift Card worth ₹100* Know More T&C</Typography>
                    <Typography><StyleBadge />Buy 2 items save 5% Buy 3 or more save 10% T&C</Typography>
                    <Typography><StyleBadge />No Cost EMI on Bajaj Finserv EMI Card on cart value above ₹2999 T&C</Typography>
                </SmallText>
                <Table>
                    <TableBody>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                            <TableCell style={{ fontWeight: 600 }}>Delivery By {date.toDateString()} | ₹40</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                            <TableCell>No Warranty</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                            <TableCell>
                                <Box component="span" style={{ color: '#2874f0' }}>SupercomNet</Box>
                                <Typography>GST invoice available</Typography>
                                <Typography>View more sellers starting from ₹{product?.price?.cost}</Typography>
                            </TableCell>
                        </ColumnText>
                            <ColumnText>
                                <TableCell colSpan={2}>
                                <img src={adURL} style={{ width: 390 }} alt="flipkartpoints" />
                                </TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{ color: '#878787' }}>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </ColumnText>
                    </TableBody>
                </Table>
            </>
    )
}

export default ProductDetails;