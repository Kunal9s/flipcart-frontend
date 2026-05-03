    // import { Box, Typography, styled, Button } from '@mui/material';

    // import { addEllipsis } from '../../utils/common-utils';
    // import GroupedButton from './ButtonGroup';
    // import { removeFromCart } from "../../redux/actions/cartActions";
    // import { useDispatch } from "react-redux";

    // const Component = styled(Box)`
    //     border-top: 1px solid #f0f0f0;
    //     // margin-left: 90px;
    //     display: flex;
    //     background: #fff;
    // `
    // const LeftComponent = styled(Box)`
    //     margin: 20px;
    //     display: flex;
    //     flex-direction: column;
    // `

    // const SmallText = styled(Typography)`
    //     color: #878787;
    //     font-size: 14px;
    //     margin-top: 10px;
    // `

    // const Remove = styled(Button)`
    //     margin-top: 20px;
    //     font-size: 16px;
    //     color: #000;
    //     font-weight: 600;
    // `

    // const CartItem = ({ item }) => {

    //     const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    //     const dispatch = useDispatch();

    //     const removeItemFromCart = (id) => {
    //         dispatch(removeFromCart(id));
    //     }

    //     return (
    //         <Component>
    //             <LeftComponent>
    //                 <img src={item.url} alt="product" style={{ height: 100, width: 100 }} />
    //                 <GroupedButton />
    //             </LeftComponent>
    //             <Box style={{ margin: 20 }}>
    //                 <Typography>{addEllipsis(item.title.longTitle)}</Typography>
    //                 <SmallText>Seller:RetailNet
    //                     <Box component="span"><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="flipkart" /></Box>
    //                 </SmallText>
    //                 <Typography style={{ margin: '20px 0'}}>
    //                     <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>₹{item?.price?.cost}</Box>&nbsp;&nbsp;&nbsp;
    //                     <Box component="span" style={{ color: '#878787' }}>₹<strike>{item?.price?.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
    //                     <Box component="span" style={{ color: '#388E3C' }}>₹{item?.price?.discount}</Box>&nbsp;&nbsp;&nbsp;
    //                 </Typography>
    //                 <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
    //             </Box>
    //         </Component>
    //         )
    // }

    // export default CartItem;

import { Box, Typography, styled, Button } from '@mui/material';
import { addEllipsis } from '../../utils/common-utils';
import GroupedButton from './ButtonGroup';
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    background: #fff;
`;

const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; /* Centers the image and ButtonGroup */
`;

const RightComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 5px;
`;

const Remove = styled(Button)`
    margin-top: 25px;
    font-size: 16px;
    color: #212121;
    font-weight: 600;
    width: fit-content;
    padding: 0;
    &:hover {
        color: #2874f0; /* Flipkart blue hover effect */
        background: none;
    }
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    color: #212121;
`;

const MRP = styled(Typography)`
    color: #878787;
    text-decoration: line-through;
    font-size: 14px;
`;

const Discount = styled(Typography)`
    color: #388E3C;
    font-size: 14px;
    font-weight: 600;
`;

const CartItem = ({ item }) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const dispatch = useDispatch();

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} alt="product" style={{ height: 110, width: 110, objectFit: 'contain' }} />
                <GroupedButton />
            </LeftComponent>
            
            <RightComponent>
                <Typography style={{ fontSize: 16 }}>{addEllipsis(item.title.longTitle)}</Typography>
                
                <SmallText>
                    Seller: RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} alt="fassured" /></span>
                </SmallText>

                <Box style={{ display: 'flex', alignItems: 'center', margin: '15px 0 5px 0' }}>
                    <Cost component="span">₹{item?.price?.cost}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span">₹{item?.price?.mrp}</MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item?.price?.discount} Off</Discount>
                </Box>

                <Remove onClick={() => removeItemFromCart(item.id)}>REMOVE</Remove>
            </RightComponent>
        </Component>
    )
}

export default CartItem;