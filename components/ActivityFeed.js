import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { auth } from "../lib/firebase";

function ActivityCard({ activity }) {
  const router = useRouter();
  const [clicked, setClicked] = React.useState(false);

  const handleClicked = async (e) => {
    // TODO: update doc
    const batch = writeBatch(getFirestore());
    const decision = e.target.name;
    const ts = Date.now();
    // update the friend request activity
    const friendRequestRef = doc(getFirestore(), "activities", activity.id);
    batch.update(friendRequestRef, {
      decision: decision,
      decisionTimestamp: ts,
    });
    if (decision === "accept") {
      // set friend
      const fromUserFriendRef = doc(
        getFirestore(),
        "users",
        activity.fromUid,
        "friends",
        activity.toUid
      );
      batch.set(fromUserFriendRef, {
        uid: activity.toUid,
      });
      const toUserFriendRef = doc(
        getFirestore(),
        "users",
        activity.toUid,
        "friends",
        activity.fromUid
      );
      batch.set(toUserFriendRef, {
        uid: activity.fromUid,
      });
    }
    await batch.commit();
    setClicked(true);
    toast.success(`${decision}ed friend request from ${activity.fromUsername}`);
    router.push("/");
  };

  return (
    <>
      {!clicked && (
        <Card sx={{ mt: 3, maxWidth: 300, maxHeight: 200 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {activity.fromUsername}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activity.fromUsername} has sent you a friend request!
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              variant="contained"
              name="accept"
              onClick={handleClicked}
            >
              Accept
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              name="reject"
              onClick={handleClicked}
            >
              Reject
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
}

async function getActivities() {
  const postsRef = collection(getFirestore(), "activities");
  const q = query(
    postsRef,
    ...[
      where("toUid", "==", auth.currentUser.uid),
      where("decision", "==", ""),
      orderBy("requestTimestamp", "desc"),
    ]
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
}

export default function ActivityFeed() {
  const [activities, setActivities] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchData();
  }, []);

  return (
    <Container>
      {activities &&
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
    </Container>
  );
}
