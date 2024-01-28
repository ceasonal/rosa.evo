import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin/dashboard">
      <ListItemIcon sx={{color:"#be9269"}}>
        <DashboardIcon />
      </ListItemIcon >
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton component={Link} to="/admin/dashboard/order">
      <ListItemIcon sx={{color:"#be9269"}}>
        <LocalShippingIcon/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>

  </React.Fragment>
);


export const secondaryListItems = (
  <React.Fragment>
<ListItemButton component={Link} to="/admin/dashboard/create">
      <ListItemIcon sx={{color:"#be9269"}}>
        <AddShoppingCartIcon/>
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItemButton>

    <ListItemButton component={Link} to="/admin/dashboard/update">
      <ListItemIcon sx={{color:"#be9269"}}>
        <UpdateIcon />
      </ListItemIcon>
      <ListItemText primary="Update Product" />
    </ListItemButton>
  </React.Fragment>
);

export const thirdListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon sx={{color:"#be9269"}}>
        <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>
  </React.Fragment>
);