// import AuthCheck from "../components/AuthCheck";
import { Box } from "@mui/material";

import SellForm from "../components/SellForm";
import AuthCheck from "../components/AuthCheck";

export default function Sell() {
  return (
    <AuthCheck>
      <Box sx={{ p: 5 }}>
        <SellForm />
      </Box>
    </AuthCheck>
  );
}
