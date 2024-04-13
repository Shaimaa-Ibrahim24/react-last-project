import { Box,Paper,Button, IconButton, Typography, Divider, Stack } from '@mui/material';
import  './Cart.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { decreaseQuantity, deleteProduct, increaseQuantity } from '../Redux/cartSlice';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
  backgroundColor:"#1976d2",
  color:"#fff",
  },
}));
const Cart = () => {
  const {selectedProducts} = useSelector((state) => state.carttt)
  const dispatch = useDispatch()
  
let subtotal = 0;
  return (
    <Box >
  
    {selectedProducts.map((item) => {
      subtotal += Number(item.price)*Number(item.quantity)
      return(
        <Paper key={item.id} dir="rtl"  className="boxy">
        <div className="tito">
       
     
            <img className="mynew" src={item.imageLink[0]}  alt=""/>
            <p className="teto">{item.productName}</p>
        </div>
        <div className="much" >
            <IconButton onClick={() => {
              dispatch(increaseQuantity(item))
            }} sx={{color:"#1976d2",left:"10px"}} >
            <AddIcon/>
            </IconButton>
            <StyledBadge badgeContent={item.quantity} color="secondary"/>

            <IconButton onClick={() => {
              dispatch(decreaseQuantity(item))
            }}  sx={{color:"#1976d2",right:"10px"}} >
              
              <RemoveIcon/>
            </IconButton>
            </div>
            <div className="yes">${Number(item.price)*Number(item.quantity)}</div>
        <Button onClick={() => {
          dispatch(deleteProduct(item))
        }} sx={{display:{xs:"none",md:"inline-flex"}}} variant="text" color="error">
         Delete
       </Button>
       <IconButton onClick={() => {
          dispatch(deleteProduct(item))
        }} sx={{display:{xs:"inline-flex",md:"none"}}}>
         <DeleteIcon color="error"/>
       </IconButton>
   </Paper>
      )
    })}


    <Paper sx={{width:"200px",mx:"auto",mt:"60px"}}>
<Typography align='center' p={2} variant="h6" >Cart Summury</Typography>
<Divider/>
<Stack direction="row" sx={{justifyContent:"space-between",p:1.2}}>
<Typography variant="body1" >Subtotal</Typography>
<Typography variant="body1" >${subtotal}</Typography>
</Stack>
<Divider/>
<Button fullWidth variant="contained" color="primary">
  Checkout
</Button>
    </Paper>
    </Box>
  );
}

export default Cart;
