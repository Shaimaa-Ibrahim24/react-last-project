import  './product-details.css';
import { useGetOneProductQuery } from '../../Redux/productsApi';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {Box,Button,IconButton,Typography} from '@mui/material';
import { useState, useRef} from 'react';
import DetailsThumb from './DetailsThumb';
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../Redux/cartSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { decreaseQuantity, increaseQuantity } from '../../Redux/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
  
  },
}));
const ProductDetails = () => {
  const {selectedProducts,selectedProductsID} = useSelector((state) => state.carttt)
  const dispatch = useDispatch()
  let { id } = useParams();
  const [index, setindex] = useState(0);
  const { data, error, isLoading } =useGetOneProductQuery(id)
  const myRef = useRef(null);

  const proQuan = (itemApi) => {
    const productQuano = selectedProducts.find((itemUser) => {
      return itemUser.id === itemApi.id
    })
    return productQuano.quantity
  }
const handleTab = (index) => {
  setindex(index)
  const images = myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
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
      <div className="app det-page">
    
          <div className="details" >
            <div className="big-img">
              <img src={data.imageLink[index]} alt=""/>
            </div>

            <div className="box">
              <div className="row">
                <h2>{data.productName}</h2>
                <span>${data.price}</span>
              </div>
            

              <p>{data.description}</p>
            
              <DetailsThumb images={data.imageLink} tab={handleTab} myRef={myRef} />
              
              { selectedProductsID.includes(data.id)?(
          <div  className="much" style={{display:"flex",alignItems:"center",marginTop:"50px"}} >
            <IconButton color="primary" onClick={() => {
            dispatch(decreaseQuantity(data))
          }}  sx={{right:"10px"}} >
            
            <RemoveIcon fontSize='small'/>
          </IconButton>
          <StyledBadge badgeContent={proQuan(data)} color="primary"/>
          <IconButton color="primary" onClick={() => {
            dispatch(increaseQuantity(data))
          }} sx={{left:"10px"}} >
          <AddIcon fontSize='small'/>
          </IconButton>
        
          </div>
        ): (<Button onClick={() => {
            dispatch(addToCart(data))
          }} sx={{textTransform:"capitalize",p:1,lineHeight:"1.1",marginTop:"50px"}} variant="contained" color="primary">
            <ShoppingCartIcon sx={{fontSize:"18px",mr:1}} />  Add To Cart
          </Button>)}

            </div>
          </div>
      
    </div>
    );
  }

}

export default ProductDetails;
