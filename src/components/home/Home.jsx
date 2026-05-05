import { useEffect } from "react";
import Banner from "./Banner";
import NavBar from "./NavBar";
import Slide from "./Slide";

import { Box, styled } from "@mui/material";
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

const Component = styled(Box)`
  padding: 20px 10px;
  // background: #F2F2F2;
`;

const Home = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.getProducts);
  const { products } = productState;
  console.log(products);

  useEffect(() => {
    const fetchData = () => {
      dispatch(getProducts());
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); 

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Component>
        <Banner />
        <MidSlide products={products} title="Deal of the Day" timer={true} />
        <MidSection />
        <Slide products={products} title="Discounts for You" timer={false} />
        <Slide products={products} title="Suggesting Items" timer={false} />
        <Slide products={products} title="Top Selection" timer={false} />
        <Slide products={products} title="Recommended Items" timer={false} />
        <Slide products={products} title="Trending Offers" timer={false} />
        <Slide products={products} title="Season's top picks" timer={false} />
        <Slide
          products={products}
          title="Top Deals on Accessories"
          timer={false}
        />
      </Component>
    </>
  );
};

export default Home;
