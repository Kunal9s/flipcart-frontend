import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/productActions";
import { Box, Typography, styled } from "@mui/material";  // ← removed Grid
import ActionItem from "./ActionItem";
import ProductDetails from "./productDetails";

const Component = styled(Box)`
    background: #F2F2F2;
    margin-top: 55px;
`

const Container = styled(Box)`
    background: #FFFFFF;
    display: flex;
    align-items: flex-start;
    padding: 20px;
    flex-wrap: wrap;
`

const LeftContainer = styled(Box)`
    flex: 0 0 40%;
    min-width: 280px;
`

const RightContainer = styled(Box)`
    flex: 1;
    padding-left: 30px;
    min-width: 280px;
`

const DetailView = () => {

  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, product } = useSelector((state) => state.getProductDetails);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (loading || !product) return <Typography>Loading...</Typography>;

  return (
    <Component>
      <Container>
        <LeftContainer>
          <ActionItem product={product} />
        </LeftContainer>
        <RightContainer>
          <Typography>{product?.title?.longTitle}</Typography>
          <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
            8 Ratings & 1 Review
            <Box component="span"><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></Box>
          </Typography>
          <Typography>
            <Box component="span" style={{ fontSize: 28 }}>₹{product?.price?.cost}</Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{ color: '#878787' }}>₹<strike>{product?.price?.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
            <Box component="span" style={{ color: '#388E3C' }}>₹{product?.price?.discount}</Box>&nbsp;&nbsp;&nbsp;
          </Typography>
          <ProductDetails product={product} />
        </RightContainer>
      </Container>
    </Component>
  );
};

export default DetailView;
