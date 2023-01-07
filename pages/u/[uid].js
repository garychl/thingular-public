import { Box, Container } from "@mui/system";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductDescription from "../../components/ProductDescription";
import { auth } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";
import { Avatar, Button, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { getUserWithUid } from "../../lib/firebase";
import toast from "react-hot-toast";

function useFetch(uid) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDoc(doc(getFirestore(), "users", uid))
      .then((docSnap) => {
        setData(docSnap.data());
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);
  // console.log("data", data);
  return { data, loading, error };
}

function useFriendFetch(uid) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDoc(doc(getFirestore(), "users", uid, "friends", auth.currentUser.uid))
      .then((docSnap) => {
        if (docSnap.exists()) {
          setData(true);
        } else {
          setData(false);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [uid]);
  // console.log("data", data);
  return { data, loading, error };
}

const initialActivityData = {
  type: "friend request",
  id: "",
  fromUid: "",
  toUid: "",
  fromUsername: "",
  toUsername: "",
  requestTimestamp: "",
  decision: "",
  decisionTimestamp: "",
};

export default function UserPage() {
  const router = useRouter();
  const { uid } = router.query;
  const { data: user, loading: loadingUser, errorUser } = useFetch(uid);

  const {
    data: isFriend,
    loading: loadingIsFriend,
    errorIsFriend,
  } = useFriendFetch(uid);

  const [clicked, setClicked] = useState(false);
  const [activityData, setActivityData] = useState(initialActivityData);

  useEffect(() => {
    const ts = Date.now().toString();
    Promise.all([
      getUserWithUid(uid),
      getUserWithUid(auth.currentUser.uid),
    ]).then(([user, currentUser]) => {
      setActivityData({
        ...activityData,
        id: "fd_req-" + ts + "-" + currentUser.id + "-" + user.uid,
        fromUid: currentUser.id,
        fromUsername: currentUser.data().username,
        toUid: user.id,
        toUsername: user.data().username,
        requestTimestamp: ts,
      });
    });
  }, [activityData, uid]);

  const handleClicked = async () => {
    console.log(activityData);
    const ref = doc(getFirestore(), "activities", activityData.id);
    await setDoc(ref, activityData);
    toast.success("Friend request sent!");
    setClicked(true);
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }
  if (errorUser) {
    return <div>No user found!</div>;
  }
  if (!user) {
    return <div>No user found!</div>;
  }
  return (
    <AuthCheck>
      <Container>
        <Container sx={{ mt: 10, display: "flex" }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[500], width: 80, height: 80 }}
                aria-label="user icon"
                src={user.photoURL}
              ></Avatar>
            }
          />
          <h1>{user.username}</h1>
        </Container>
        {isFriend === true ? (
          <Button variant="outlined" sx={{ ml: 18 }} disabled>
            <Typography variant="button">Friend</Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ ml: 18 }}
            onClick={handleClicked}
            disabled={clicked}
          >
            {clicked ? "Friend Request Sent" : "Add Friend"}
          </Button>
        )}
      </Container>
    </AuthCheck>
  );
}
