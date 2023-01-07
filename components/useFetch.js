import React, { useState, useEffect } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { auth } from "../lib/firebase";

function useFetch(post) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDocs(
      collection(
        getFirestore(),
        "users",
        post.uid,
        "posts",
        post.slug,
        "actions"
      )
    )
      .then((querySnapshot) => {
        const actionObjects = [];
        querySnapshot.forEach((doc) => {
          actionObjects.push({ timestamp: doc.id, data: doc.data() });
        });
        const currentUserActioinObjects = actionObjects.filter(
          (actionObject) => {
            return actionObject.data.uid == auth.currentUser.uid;
          }
        );
        if (currentUserActioinObjects.length == 0) {
          setData(false);
          setLoading(false);
        } else {
          const targetDoc = Math.max(
            ...currentUserActioinObjects.map((actionObject) => {
              return actionObject.timestamp;
            })
          );
          const result = currentUserActioinObjects
            .filter((actionObject) => actionObject.timestamp == targetDoc)
            .map((actionObject) => {
              return actionObject.data.action;
            })[0];
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [post]);

  return { data, loading, error };
}

export default useFetch;
