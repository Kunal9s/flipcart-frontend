
import { useState, useContext } from 'react';
import { Box, Button, Typography, styled, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';
import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    paddingRight: '80px',
    '& > *': {
        fontSize: 15,
        cursor: 'pointer'
    },
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))
    
const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    gap: '4px',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}));
    
const LoginButton = styled(Button)`
    color: #2874f0;
    background: #fff;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 2px;
    box-shadow: none;
    font-weight: 600;
    height: 32px;
`
const CartBadge = styled(Badge)`
    & .MuiBadge-badge {
    background-color: #ff6161;
    color: white;
}
`
const CustomButtons = () => {
    
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(DataContext);
    const { setLoginOpen } = useContext(DataContext);
    const navigate = useNavigate();

    console.log("ACCOUNT 👉", account);

    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setLoginOpen(true);
    }

    return (
        <Wrapper>
            {
                account && account.username ? (
                <Profile account={account} setAccount={setAccount} />
                ) : (
                <LoginButton variant="contained" onClick={openDialog}>
                    Login
                </LoginButton>
                )
            }
            <Typography>Become a Seller</Typography>
            <Typography>More</Typography>
            <Container onClick={() => {
                console.log("cart clicked");
                
                const token = localStorage.getItem("token");

                    if (!token) {
                        setOpen(true);
                        return;
                    }
                    
                    navigate("/cart")
                }} 
                >
            <CartBadge badgeContent={cartItems?.length} >
                <ShoppingCart style={{ color: 'inherit' }} />
            </CartBadge>
                <Typography style={{ marginLeft: 5 }}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    )
}

export default CustomButtons;