import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import LayersIcon from '@mui/icons-material/Layers';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton component={Link} to="/admin/dashboard/order">
      <ListItemIcon>
        <LocalShippingIcon/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>

    <ListItemButton component={Link} to="/admin/dashboard/create">
      <ListItemIcon>
        <AddShoppingCartIcon/>
      </ListItemIcon>
      <ListItemText primary="Add Product" />
    </ListItemButton>

    <ListItemButton component={Link} to="/admin/dashboard/update">
      <ListItemIcon>
        <UpdateIcon />
      </ListItemIcon>
      <ListItemText primary="Update Product" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItemButton>

  </React.Fragment>
);
