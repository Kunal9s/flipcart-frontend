import CustomButtons from "./CustomButtons";
import Search from "./Search";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import LoginDialog from "../login/LoginDialog";


const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;

const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const CustomButtonWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: "auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const Header = () => {

  const { loginOpen, setLoginOpen, drawerOpen, setDrawerOpen } = useContext(DataContext);

  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  // const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const list = () => {
    return (
    <Box style={{ width: 200 }} onClick={handleClose}>
        <List>
            <ListItem> 
                <CustomButtons />
            </ListItem>
        </List>
    </Box>
    )
  }

  return (
    <>
    <StyledHeader>
      <Toolbar style={{ minHeight: 55, display: "flex", alignItems: "center", width: "100%" }}>
        <MenuButton color="inherit" onClick={handleOpen}>
          <Menu />
        </MenuButton>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {list()}
        </Drawer>
        <Component to="/">
          <img src={logoURL} alt="logo" style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore&nbsp;
              <Box component="span" style={{ color: "#FFE500" }}>
                Plus
              </Box>
            </SubHeading>
            <PlusImage src={subURL} alt="sub-logo" />
          </Box>
        </Component>
          <Search />
        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
    <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
    </>
  );
};

export default Header;
