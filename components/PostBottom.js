import { Checkbox, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import PanToolIcon from "@mui/icons-material/PanTool";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import PanToolRoundedIcon from "@mui/icons-material/PanToolRounded";
import ArrowCircleUpRoundedIcon from "@mui/icons-material/ArrowCircleUpRounded";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import {
  doc,
  getDoc,
  getFirestore,
  Timestamp,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { auth } from "../lib/firebase";
import useFetch from "./useFetch";

async function writeAction(post, action) {
  const postUid = post.uid;
  const postSlug = post.slug;
  const postRef = doc(getFirestore(), "users", postUid, "posts", postSlug);
  const postSnap = await getDoc(postRef);
  // ------------- set a new action count value -------------
  // need to get the most updated post data
  const latestQueueCount = postSnap.data().queueCount;
  // the action value here is the original action value
  const newQueueCount =
    action == false ? latestQueueCount + 1 : latestQueueCount - 1;
  await updateDoc(postRef, {
    queueCount: newQueueCount,
    updatedAt: serverTimestamp(),
  });

  // ------------- create event data for the action -------------
  const actionData = {
    timestamp: serverTimestamp(),
    uid: auth.currentUser.uid,
    action: !action,
  };
  const actionRef = doc(
    getFirestore(),
    "users",
    postUid,
    "posts",
    postSlug,
    "actions",
    Date.now().toString()
  );
  await setDoc(actionRef, actionData);
}

export default function PostBottom({ post }) {
  const {
    data: clicked,
    loading: loadingClicked,
    errorClicked,
  } = useFetch(post);

  const [clickAction, setClickAction] = useState(clicked);
  const [clickComment, setClickComment] = useState(false);
  const [clickShare, setClickShare] = useState(false);

  useEffect(() => {
    setClickAction(clicked);
  }, [clicked]);

  const handleClickAction = () => {
    setClickAction(!clickAction);
    const syncAction = async () => {
      const success = await writeAction(post, clickAction);
    };
    syncAction();
  };

  const renderActionIcon = (postType) => {
    if (loadingClicked) {
      return <div>loading</div>;
    }
    if (errorClicked) {
      return <div>error</div>;
    }
    switch (postType) {
      case "ask":
        return (
          <IconButton aria-label="Upvote">
            <Typography variant="subtitle1" component="h3">
              Upvote
            </Typography>
            <Checkbox
              checked={clickAction}
              onChange={handleClickAction}
              icon={<ArrowCircleUpRoundedIcon />}
              checkedIcon={<ArrowCircleUpTwoToneIcon />}
            />
          </IconButton>
        );
      case "thought":
        return (
          <IconButton aria-label="Care">
            <Typography variant="subtitle1" component="h3">
              Care
            </Typography>
            <Checkbox
              checked={clickAction}
              onChange={handleClickAction}
              icon={<FavoriteBorderOutlinedIcon />}
              checkedIcon={<FavoriteOutlinedIcon />}
            />
          </IconButton>
        );
      default:
        return (
          <IconButton aria-label="Queue">
            <Typography variant="subtitle1" component="h3">
              Queue
            </Typography>
            <Checkbox
              checked={clickAction}
              onChange={handleClickAction}
              icon={<PanToolOutlinedIcon />}
              checkedIcon={<PanToolIcon />}
            />
          </IconButton>
        );
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={0}
        margin={1}
      >
        {renderActionIcon(post.postType)}
        <IconButton>
          <Typography variant="subtitle1" component="h3">
            Comment
          </Typography>
          <ChatIcon />
        </IconButton>
        <IconButton>
          <Typography variant="subtitle1" component="h3">
            Share
          </Typography>
          <RecordVoiceOverIcon />
        </IconButton>
      </Stack>
    </>
  );
}
