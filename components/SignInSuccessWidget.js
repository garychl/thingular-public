import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup, signInAnonymously, signOut } from "firebase/auth";
import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function SignInSuccessWidget() {
  return (
    <Container sx={{ mt: 20 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box flex={1}>
          <Typography variant="h2">Congratulations! </Typography>{" "}
          <Typography variant="h6" sx={{ p: 2 }}>
            You are signed in now. You can start sharing your resources with
            your friends and others.
          </Typography>
        </Box>
        <Box flex={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 5,
              gap: 2,
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Link href="/">
              <Button variant="contained">Home Page </Button>
            </Link>

            <Button variant="contained" onClick={() => signOut(auth)}>
              <Typography variant="button" sx={{ p: 1 }}>
                Sign Out
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
