import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

export default function PostMiddle({ post }) {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/p/${post.slug}?uid=${post.uid}`)}>
      <CardContent sx={{ paddingLeft: 9 }}>
        <Typography variant="h6" color="text.secondary">
          {post.productDescription ? post.productDescription : post.content}
        </Typography>
      </CardContent>

      {post.imageURL ? (
        <Container sx={{ width: "30%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={post.imageURL}
              alt={"Image of " + post.postTitle}
            />
          </CardActionArea>
        </Container>
      ) : null}
    </Container>
  );
}
