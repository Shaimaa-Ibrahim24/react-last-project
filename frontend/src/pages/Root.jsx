import React from 'react';
import { Outlet } from 'react-router-dom';
import Myappbar from '../comp/Myappbar';
import Mydrawer from '../comp/Mydrawer';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import getDesignTokens from '../Styles/Mytheme';

const drawerWidth = 240;
const Root = () => {
  const [noneorblock, setnoneorblock] = useState("none");
  const [permortemp, setpermortemp] = useState("permanent");
  const [mode, setmyMode] = useState(localStorage.getItem("currentMode")===null?"light":localStorage.getItem("currentMode")==="light"?"light":"dark");

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div>
      <Myappbar {...{drawerWidth,setnoneorblock,setpermortemp}} />
      <Mydrawer {...{drawerWidth,setmyMode,noneorblock,permortemp,setnoneorblock,setpermortemp}}    />

      <Box sx={{ml:{sm: `${drawerWidth}px`},display:"flex",justifyContent:"center",mt:"66px"}}>
      <Outlet />
      </Box>
    </div>
    </ThemeProvider>
  );
}

export default Root;
