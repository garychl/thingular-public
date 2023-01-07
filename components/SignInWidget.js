import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { signInWithPopup, signInAnonymously, signOut } from "firebase/auth";
import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";

export default function SignInWidget() {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

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
          <Typography variant="h2">Thingular</Typography>{" "}
          <Typography variant="h6" sx={{ p: 2 }}>
            Thingular is a new way to connect, help and share with your friends
            and others.
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
            <Button variant="contained" onClick={signInWithGoogle}>
              <Image
                src={"/google.png"}
                alt="Google logo"
                width="30"
                height="30"
              />
              <Typography variant="button" sx={{ p: 1 }}>
                Sign in with Google
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
