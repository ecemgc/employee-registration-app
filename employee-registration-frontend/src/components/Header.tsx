import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setLogout } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

export default function Header(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    dispatch(setLogout());
  };
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        <ListItem key="employees" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Employees" />
          </ListItemButton>
        </ListItem>
        <ListItem key="departments" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Departments" />
          </ListItemButton>
        </ListItem>
        <ListItem key="roles" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Roles" />
          </ListItemButton>
        </ListItem>
        <ListItem key="logout" disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Button
              onClick={() => handleNavigate("/employees")}
              key="employees"
              sx={{ color: "#fff" }}
            >
              Employees
            </Button>
            <Button
              onClick={() => handleNavigate("/departments")}
              key="departments"
              sx={{ color: "#fff" }}
            >
              Departments
            </Button>
            <Button
              onClick={() => handleNavigate("/roles")}
              key="roles"
              sx={{ color: "#fff", marginRight: "3rem" }}
            >
              Roles
            </Button>
            <Button
              onClick={handleLogout}
              key="logout"
              sx={{ color: "#fff", backgroundColor: "#215a9f" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
