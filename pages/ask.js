// import AuthCheck from "../components/AuthCheck";
import { Box } from "@mui/material";

import AskForm from "../components/AskForm";
import AuthCheck from "../components/AuthCheck";

export default function Thought() {
  return (
    <AuthCheck>
      <Box sx={{ p: 5 }}>
        <AskForm />
      </Box>
    </AuthCheck>
  );
}
