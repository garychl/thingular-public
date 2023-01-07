import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";

export default function PostMenuButton() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRoute = (e) => {
    setAnchorEl(null);
    router.push(e.target.getAttribute("href"));
  };

  return (
    <div>
      <Button
        id="post-button"
        variant="contained"
        aria-controls={open ? "post-meun" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Post
      </Button>
      <Menu
        id="post-meun"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "post-button",
        }}
      >
        <MenuItem href="/ask" onClick={handleRoute}>
          Ask
        </MenuItem>
        <MenuItem href="/sell" onClick={handleRoute}>
          Sell
        </MenuItem>
        <MenuItem href="/lend" onClick={handleRoute}>
          Lend
        </MenuItem>
        <MenuItem href="/thought" onClick={handleRoute}>
          Thought
        </MenuItem>
      </Menu>
    </div>
  );
}
