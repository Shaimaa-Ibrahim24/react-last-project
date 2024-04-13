import React from 'react';
import {Drawer,Divider, List,ListItem,ListItemButton,ListItemIcon,ListItemText, IconButton, useTheme} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate } from "react-router-dom";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector} from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Mydrawer = ({drawerWidth,setmyMode,noneorblock,setnoneorblock,permortemp,setpermortemp}) => {
  const {selectedProducts} = useSelector((state) => state.carttt)
  const navigate = useNavigate();
  const theme = useTheme()
  const location = useLocation()
  const myList = [
    {text:"Home",icon:<HomeIcon/>,path:"/"},
    {text:"Cart",icon: <StyledBadge badgeContent={selectedProducts.length} color="secondary">
    <ShoppingCartIcon />
  </StyledBadge>,path:"/cart"},
    
  ]
  return (
    <Drawer
        sx={{
          display:{xs:noneorblock,sm:"block"}
          ,width: `${drawerWidth}px`,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width:`${drawerWidth}px` ,
            boxSizing: 'border-box',
          },
        }}
        variant={permortemp}
        anchor="left"
        open={true}
        onClose={() => {
          setnoneorblock("none")
          setpermortemp("permanent")
        }}
      >
      
      
      <List>
      <ListItem sx={{display:"flex",justifyContent:"center",mb:"14px"}}  disablePadding>
      <IconButton onClick={() => {
        localStorage.setItem("currentMode",theme.palette.mode === "light"?"dark":"light")
        setmyMode(theme.palette.mode === "light"?"dark":"light")
      }}  color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon sx={{color:"orange"}} /> : <Brightness4Icon />}
      </IconButton>
        </ListItem>
        <Divider />
        {myList.map((item) => {
          return(
            <ListItem sx={{bgcolor:location.pathname === item.path?theme.palette.favColor.main:null}} key={item.text} disablePadding>
            <ListItemButton onClick={() => {
              navigate(item.path)
            }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          )
        })}
      
      </List>
        
        
      </Drawer>
  );
}

export default Mydrawer;
