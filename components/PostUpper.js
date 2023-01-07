import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  CardActionArea,
  CardHeader,
  Container,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";

export default function PostUpper({ post }) {
  const router = useRouter();
  return (
    <Container>
      <CardHeader
        avatar={
          <CardActionArea>
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="user icon"
              onClick={() => router.push(`/u/${post.uid}`)}
            >
              {post.username ? post.username[0] : "Error"}
            </Avatar>
          </CardActionArea>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post.postTitle}
        titleTypographyProps={{ variant: "h5" }}
        subheader={post.username}
        subheaderTypographyProps={{ variant: "subtitle" }}
      />
    </Container>
  );
}
