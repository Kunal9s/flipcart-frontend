import { Box, Button, styled } from "@mui/material";
import { useState } from 'react';
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/actions/cartActions";
import { payUsingPaytm } from "../service/api";
import { post } from '../../utils/paytm';
import axios from 'axios';
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";

const LeftContainer = styled(Box)`
  min-width: 40%;
  padding: 10px 0 0 20px;
`;

const Image = styled("img")({
  padding: '15px',
});

const StyledButton = styled(Button)`
  width: 48%;
  height: 50px;
  border-radius: 5px;
  font-size: 13px;
`;

const ActionItem = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoginOpen } = useContext(DataContext);

  const [quantity, setQuantity] = useState(1);

  const { id } = product;

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate('/cart');
  }


  const buyNow = async () => {
  console.log("buynow clicked");
  
  const token = localStorage.getItem("token");

  if (!token) {
      setLoginOpen(true);
      return;
  }

  navigate("/address", { state: {product} });
};

  return (
    <LeftContainer>
      <Box style={{ padding: "15px 20px", border: "1px solid #f0f0f0", width: "90%" }}>
        <img src={product.detailUrl} alt="product" />
        <Box style={{ display: "flex", marginTop: 10, gap: 8 }}>
      <StyledButton
        variant="contained"
        onClick={() => addItemToCart()}
        style={{ marginRight: 10, background: "#ff9f00" }}
      >
        <Cart style={{ fontSize: 18, marginRight: 4 }} />
        Add to Cart
      </StyledButton>
      <StyledButton variant="contained" onClick={buyNow} style={{ background: "#fb541b" }}>
        <Flash style={{ fontSize: 18, marginRight: 4 }} />
        Buy Now
      </StyledButton>
      </Box>
      </Box>
    </LeftContainer>
  );
};

export default ActionItem;
