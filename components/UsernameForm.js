import { doc, writeBatch, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";
import { Box, Button, Container, Typography } from "@mui/material";

// Username form
export default function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(getFirestore(), "users", user.uid);
    const usernameDoc = doc(getFirestore(), "usernames", formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(getFirestore());
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "usernames", username);
        const snap = await getDoc(ref);
        console.log("Firestore read executed!", snap.exists());
        setIsValid(!snap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <Container sx={{ mt: 20 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography variant="h6">Pick a user name for yourself</Typography>
          <form onSubmit={onSubmit}>
            <input
              name="username"
              placeholder="enter your user name here..."
              value={formValue}
              onChange={onChange}
            />
            <UsernameMessage
              username={formValue}
              isValid={isValid}
              loading={loading}
            />
            <Button type="submit" variant="contained" disabled={!isValid}>
              Choose
            </Button>

            <div className="hidden">
              <h3>Debug State</h3>
              <div>
                Username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
              </div>
            </div>
          </form>
        </Box>
      </Container>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken or too short!</p>;
  } else {
    return <p></p>;
  }
}
