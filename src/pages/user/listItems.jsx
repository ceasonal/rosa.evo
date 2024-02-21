import * as React from 'react';
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/user/dashboard">
      <ListItemIcon sx={{color:"#be9269"}}>
        <DashboardIcon />
      </ListItemIcon >
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);


export const secondaryListItems = (
  <React.Fragment>
       <ListItemButton component={Link} to="/user/dashboard/details">
      <ListItemIcon sx={{color:"#be9269"}}>
        <ManageAccountsIcon/>
      </ListItemIcon>
      <ListItemText primary="Details" />
    </ListItemButton>
    
    <ListItemButton component={Link} to="/user/dashboard/order">
      <ListItemIcon sx={{color:"#be9269"}}>
        <LocalShippingIcon/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
  </React.Fragment>
);

const thirdListItems = () =>{
  const navigate = useNavigate();
  const handleLogOut = () => {
    window.location.reload();
    sessionStorage.removeItem("token");
    localStorage.clear();
    supabase.auth.signOut();
    navigate('/')
  };
  return(
  <React.Fragment>
    <ListItemButton onClick={handleLogOut}>
      <ListItemIcon sx={{color:"#be9269"}}>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
  );
}
export default thirdListItems;