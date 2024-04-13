import React from 'react';
import {AppBar,Avatar,Toolbar,Typography} from '@mui/material';
import { Link, IconButton  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



const Myappbar = ({drawerWidth,setnoneorblock,setpermortemp}) => {
  return (
    <AppBar  sx={{ width:{sm: `calc(100% - ${drawerWidth}px)`}, ml: {xs:0,sm:`${drawerWidth}px`} }} position="static">
    <Toolbar>
      <IconButton onClick={() => {
        setnoneorblock("block")
        setpermortemp("temporary")
      }} sx={{mr:"9px",display:{sm:"none"}}} >
        <MenuIcon/>
      </IconButton>
      <Link underline='none'  sx={{ flexGrow: 1,color:"inherit","&:hover": {fontSize:"17px"} }}  href="/">Online Store</Link>
      <Typography mr={1} variant="h6" color="inherit">Shaimaa Ibrahim</Typography>
      <Avatar alt="Remy Sharp" src="./imgs/shaimaa.jpg" />
    </Toolbar>
  </AppBar>
  );
}

export default Myappbar;
