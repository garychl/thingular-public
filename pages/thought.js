// import AuthCheck from "../components/AuthCheck";
import { Box } from "@mui/material";

import ThoughtForm from "../components/ThoughtForm";
import AuthCheck from "../components/AuthCheck";

export default function Thought() {
  return (
    <AuthCheck>
      <Box sx={{ p: 5 }}>
        <ThoughtForm />
      </Box>
    </AuthCheck>
  );
}
