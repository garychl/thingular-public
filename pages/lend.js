// import AuthCheck from "../components/AuthCheck";
import { Box } from "@mui/material";
import LendForm from "../components/LendForm";
import AuthCheck from "../components/AuthCheck";

export default function Lend() {
  return (
    <AuthCheck>
      <Box sx={{ p: 5 }}>
        <LendForm />
      </Box>
    </AuthCheck>
  );
}
