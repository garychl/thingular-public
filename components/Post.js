import { Box, Card } from "@mui/material";
import React from "react";
import PostUpper from "./PostUpper";
import PostMiddle from "./PostMiddle";
import PostBottom from "./PostBottom";

export default function Post({ post }) {
  console.log(post);
  return (
    <Box padding={2}>
      <Card elevation={3}>
        <PostUpper post={post} />
        <PostMiddle post={post} />
        <PostBottom post={post} />
      </Card>
    </Box>
  );
}
