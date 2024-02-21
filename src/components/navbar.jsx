import * as React from "react";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import Pdf from "../assets/pdf/rosa_evo.pdf";
import CartButton from "../pages/Cart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import supabase from "../assets/config/SupabaseClient";

const pages = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Brochure" },
  { name: "About Us", path: "/about" },
  // { name: "Contact Us", path: "/contact" },
];
const iconMap = {
  Home: <HomeIcon sx={{color:"#4D1F08"}} />,
  Products: <StorefrontIcon sx={{color:"#4D1F08"}}/>,
  Brochure: <PictureAsPdfIcon sx={{color:"#4D1F08"}}/>,
  "About Us": <InfoIcon sx={{color:"#4D1F08"}}/>,
};
const ResponsiveAppBar = ({ token }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [brochurePdf, setBrochurePdf] = React.useState(Pdf);
  const [navMenuKey, setNavMenuKey] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(false);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setNavMenuKey(prevKey => prevKey + 1); // Increment key to force re-render menu component
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleBrochureClick = () => {
    saveAs(brochurePdf, "rosa_evo_brochure.pdf");
    handleCloseNavMenu();
  };

  const handleLogOut = () => {
    window.location.reload();
    sessionStorage.removeItem("token");
    localStorage.clear();
    supabase.auth.signOut();
  };
  React.useEffect(() => {
    const fetchUserDetails = async () => {
    try{
      const { data: { user } } = await supabase.auth.getUser();
      if (user.id === import.meta.env.VITE_ADMIN_USER) {
        // console.log("Admin User")
        // window.location.reload();
        setIsAdmin(true);
      }else{
        setIsAdmin(false);
      }
    }catch{
      console.log("error")
    }
  }
    fetchUserDetails();
  },[])
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "inherit",
        color: "#4D1F08",
        boxShadow: "none",
      }}
      key={navMenuKey}
    >
      <Container maxWidth="xl" sx={{ backgroundColor: "inherit" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            rosa.evo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => [
                <MenuItem
                  key={page.name}
                  onClick={
                    page.name === "Brochure"
                      ? handleBrochureClick
                      : handleCloseNavMenu
                  }
                  component={Link}
                  to={page.path}
                >
                  {iconMap[page.name] && (
              <>
                {iconMap[page.name]} {/* Display icon if available */}
                 {/* Add space between icon and text */}
              </>
            )}
                  <Typography
                    textAlign="center"
                    style={{ color: "#4D1F08", fontFamily: "monospace", marginLeft:20 }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>,
                // Use a comma to separate array elements
              ])}
              {token ? (
                <>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      handleLogOut();
                    }}
                    component={Link}
                    to="/"
                  >
                    <LogoutIcon sx={{color:"#4D1F08"}}/>
                    <Typography
                      textAlign="center"
                      style={{ color: "#4D1F08", fontFamily: "monospace", marginLeft:20 }}
                    >
                      Sign Out
                    </Typography>
                  </MenuItem>
                  {isAdmin && (
                    <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      if (window.location.pathname === "/admin/dashboard") {
                        window.location.reload();
                      }
                    }}
                      component={Link}
                      to="/admin/dashboard"
                    >
                      <AdminPanelSettingsIcon sx={{color:"#4D1F08"}}/>
                      <Typography
                        textAlign="center"
                        style={{ color: "#4D1F08", fontFamily: "monospace",marginLeft:20 }}
                      >
                        Admin
                      </Typography>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/user/dashboard"
                  >
                    <AccountCircleIcon sx={{color:"#4D1F08"}}/>
                    <Typography
                      textAlign="center"
                      style={{ color: "#4D1F08", fontFamily: "monospace",marginLeft:20 }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                    }}
                    >
                    <CartButton/>
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to="/signin"
                >
                  <LoginIcon sx={{color:"#4D1F08"}}/>
                  <Typography
                    textAlign="center"
                    style={{ color: "#4D1F08", fontFamily: "monospace", marginLeft:20 }}
                  >
                    Sign In
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            rosa.evo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={
                  page.name === "Brochure"
                    ? handleBrochureClick
                    : handleCloseNavMenu
                }
                component={Link}
                to={page.path}
                sx={{
                  my: 2,
                  color: "#4D1F08",
                  display: "block",
                  textTransform: "none",
                  fontSize: "14px",
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {token ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {isAdmin && (
                    <MenuItem
                      component={Link}
                      to={"/admin/dashboard"}
                      onClick={handleClose}
                    >
                      Admin
                    </MenuItem>
                  )}
                  <MenuItem
                    component={Link}
                    to={"/user/dashboard"}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      handleLogOut();
                    }}
                    component={Link}
                    to={"/"}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
                    <CartButton/>
              </div>
            ) : (
              <Link
                to="/signin"
                style={{
                  color: "#4D1F08",
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
