import { Box, Container } from "@mui/system";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductDescription from "../../components/ProductDescription";
import { auth } from "../../lib/firebase";
import AuthCheck from "../../components/AuthCheck";

function useFetch(pid, uid) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDoc(doc(getFirestore(), "users", uid, "posts", pid))
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
  }, [pid, uid]);

  return { data, loading, error };
}

export default function PostPage() {
  const router = useRouter();
  const { pid, uid } = router.query;
  const { data: post, loading: loadingPost, errorPost } = useFetch(pid, uid);

  if (loadingPost) {
    return <div>Loading...</div>;
  }
  if (errorPost) {
    return <div>No post found!</div>;
  }
  if (!post) {
    return <div>No post found!</div>;
  }
  return (
    <AuthCheck>
      <Box>
        <Container sx={{ mt: 10 }}>
          <ProductDescription post={post} imageRight={false} />
        </Container>
      </Box>
    </AuthCheck>
  );
}
