import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import PostMenuButton from "./PostMenuButton";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Grouped = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
}));

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  float: "left",
}));

function NavBar() {
  const { user, username } = useContext(UserContext);
  const [openUserSetting, setUserSetting] = React.useState(false);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  };

  return (
    <AppBar position="sticky">
      <StyledToolBar>
        {/* left  */}
        <Grouped>
          <Link href="/">
            <Image src="/logo-wo-name.png" alt="icon" height={60} width={60} />
          </Link>

          {username && (
            <Grouped>
              <Search>
                <InputBase placeholder="search..." disabled />
              </Search>
            </Grouped>
          )}
        </Grouped>

        {/* right */}
        {username && (
          <Grouped>
            <PostMenuButton />

            <Badge badgeContent={0} color="error">
              <MailIcon color="action" />
            </Badge>
            <Badge badgeContent={0} color="error">
              <NotificationsIcon color="action" />
            </Badge>

            <Box
              id="user-icon-button"
              aria-controls={openUserSetting ? "user-icon-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openUserSetting ? "true" : undefined}
              onClick={(e) => setUserSetting(true)}
              sx={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <Avatar
                src={user?.photoURL || "/user-icon.png"}
                sx={{ width: 30, height: 30 }}
              />
              <Typography sx={{ display: { xs: "none", md: "inline" } }}>
                {username}
              </Typography>
            </Box>

            <Menu
              id="user-icon-menu"
              aria-labelledby="user-icon-button"
              open={openUserSetting}
              onClose={(e) => setUserSetting(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem disabled>Profile</MenuItem>
              <MenuItem disabled>Settings</MenuItem>
              <MenuItem
                onClick={() => {
                  signOut(auth);
                  router.push("/enter");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Grouped>
        )}
      </StyledToolBar>
    </AppBar>
  );
}

export default NavBar;
