import  './Home.css';
import { Stack, Button, useTheme } from '@mui/material';
import{Card,IconButton}  from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { useGetproductsByNameQuery } from '../Redux/productsApi'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../Redux/cartSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { decreaseQuantity, increaseQuantity } from '../Redux/cartSlice';
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
  
  },
}));
const Home = () => {
  const {selectedProducts,selectedProductsID} = useSelector((state) => state.carttt)
  const theme = useTheme()
  const navigate = useNavigate()
  
  const { data, error, isLoading } = useGetproductsByNameQuery()
  const dispatch = useDispatch()

  const proQuan = (itemApi) => {
    const productQuano = selectedProducts.find((itemUser) => {
      return itemUser.id === itemApi.id
    })
    return productQuano.quantity
  }
  if(isLoading){
    return(
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    )
  }
  if(error){
    return(
      <Box>
      <Typography variant="h4" color="error">Errorrr....</Typography>
    </Box>
    )
  }
  if(data){
    return (
      <Stack direction="row" sx={{flexWrap:"wrap",justifyContent:"center"}}>
      {data.map((item,index) => {
        return(
          <Card className='cardo' key={item.id} sx={{ maxWidth: 277 , mb:6,mx:2}}>
        <CardMedia
          component="img"
          height="277"
          image={item.imageLink[0]}
          alt={item.productName}
          onClick={() => {
            navigate(`/product-details/${item.id}`)
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {item.description}
          </Typography>
        </CardContent>
        <CardActions sx={{justifyContent:"space-between"}} disableSpacing>
        { selectedProductsID.includes(item.id)?(
          <div dir='rtl'  className="much" >
          <IconButton color="primary" onClick={() => {
            dispatch(increaseQuantity(item))
          }} sx={{left:"10px"}} >
          <AddIcon fontSize='small'/>
          </IconButton>
          <StyledBadge badgeContent={proQuan(item)} color="primary"/>

          <IconButton color="primary" onClick={() => {
            dispatch(decreaseQuantity(item))
          }}  sx={{right:"10px"}} >
            
            <RemoveIcon fontSize='small'/>
          </IconButton>
          </div>
        ): (<Button onClick={() => {
            dispatch(addToCart(item))
          }} sx={{textTransform:"capitalize",p:1,lineHeight:"1.1"}} variant="contained" color="primary">
            <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />  Add To Cart
          </Button>)}
        <Typography mr={1} variant="body1" color={theme.palette.error.light}>${item.price}</Typography>
        
        </CardActions>
      
      </Card>
        )
      })}
      </Stack>
    );
  }
  
}

export default Home;
