import { Box } from "@mui/material";
import React, { useEffect } from "react";
import allPosts from "../data/dummyData";
import Post from "./Post";
import { firestore, auth } from "../lib/firebase";
import {
  serverTimestamp,
  query,
  collection,
  orderBy,
  getFirestore,
  setDoc,
  getDocs,
  doc,
  collectionGroup,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

function filterTranType(doc, criteria) {
  if (
    criteria["transactionType"].includes("free") &&
    doc.data()["price"] == 0
  ) {
    return true;
  } else if (
    criteria["transactionType"].includes("rent") &&
    doc.data()["postType"] == "lend"
  ) {
    return true;
  } else if (
    criteria["transactionType"].includes("secondHand") &&
    doc.data()["postType"] === "sell" &&
    doc.data()["price"] > 0
  ) {
    return true;
  } else {
    return false;
  }
}

function filterPostTypeByPurpose(doc, criteria) {
  if (
    criteria["purpose"].includes("find") &&
    (doc.data()["postType"] == "sell" || doc.data()["postType"] == "lend")
  ) {
    return true;
  } else if (
    criteria["purpose"].includes("help") &&
    doc.data()["postType"] == "ask"
  ) {
    return true;
  } else if (
    criteria["purpose"].includes("thought") &&
    doc.data()["postType"] == "thought"
  ) {
    return true;
  } else {
    return false;
  }
}

async function getFriendsId(userId) {
  const ref = collection(
    getFirestore(),
    "users",
    auth.currentUser.uid,
    "friends"
  );
  const querySnapshot = await getDocs(query(ref));
  const friendsId = querySnapshot.docs.map((doc) => doc.id);

  return friendsId;
}

async function getPosts(criteria) {
  console.log("criteria", criteria);

  // return null if any criteria area is empty
  if (Object.keys(criteria).some((key) => criteria[key].length == 0)) {
    return null;
  } else {
    const postsRef = collectionGroup(getFirestore(), "posts");
    const whereClauses = [];
    let querySnapshot = null;
    var returnedPosts = [];

    if (
      criteria["shareTo"].includes("public") &&
      criteria["shareTo"].length == 1
    ) {
      whereClauses.push(where("shareTo", "==", "public"));
      whereClauses.push(where("uid", "not-in", [auth.currentUser.uid, ""]));
      console.log("whereClauses", whereClauses);
      const q = query(postsRef, ...whereClauses);
      querySnapshot = await getDocs(q);
      returnedPosts = querySnapshot.docs;
    } else if (
      criteria["shareTo"].includes("friends") &&
      criteria["shareTo"].length == 1
    ) {
      const friendsId = await getFriendsId(auth.currentUser.uid);
      console.log("friendsId", friendsId);
      if (friendsId.length > 0) {
        whereClauses.push(where("uid", "in", friendsId));
      } else {
        whereClauses.push(where("uid", "==", ""));
      }
      console.log("whereClauses", whereClauses);
      const q = query(postsRef, ...whereClauses);
      querySnapshot = await getDocs(q);
      returnedPosts = querySnapshot.docs;
    } else {
      const friendsId = await getFriendsId(auth.currentUser.uid);

      // q1 to get public post from non-friends
      const publicQuerySnapshot = await getDocs(
        query(
          postsRef,
          ...[
            where("shareTo", "==", "public"),
            where("uid", "not-in", [auth.currentUser.uid, friendsId]),
          ]
        )
      );
      //  q2 to get all posts from friends
      const friendsQuerySnapshot = await getDocs(
        query(
          postsRef,
          ...[
            friendsId.length > 0
              ? where("uid", "in", friendsId)
              : where("uid", "==", ""),
          ]
        )
      );

      // get union of them
      const postsIds = [
        ...publicQuerySnapshot.docs,
        ...friendsQuerySnapshot.docs,
      ].map((doc) => doc.id);
      const uniquePostsIds = [...new Set(postsIds)];
      returnedPosts = uniquePostsIds.map((id) => {
        const posts = [
          ...publicQuerySnapshot.docs,
          ...friendsQuerySnapshot.docs,
        ].filter((doc) => doc.id === id);
        return posts[0];
      });
    }

    const posts = returnedPosts
      .filter((doc) => {
        const pass = filterPostTypeByPurpose(doc, criteria);
        return pass;
      })
      .filter((doc) => {
        if (doc.data().postType != "thought") {
          return criteria["productCategory"].includes(
            doc.data().productCategory
          );
        } else {
          return true;
        }
      })
      .filter((doc) => {
        if (doc.data().postType == "sell" || doc.data().postType == "lend") {
          const pass = filterTranType(doc, criteria);
          return pass;
        } else {
          return true;
        }
      })
      .map((doc) => doc.data());
    return posts;
  }
}

export default function Feed({ criteria }) {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(criteria);
      setPosts(posts);
    };
    fetchData();
  }, [criteria]);

  console.log("posts", posts);

  return (
    <Box>
      {posts ? posts.map((post) => <Post key={post.slug} post={post} />) : null}
    </Box>
  );
}
