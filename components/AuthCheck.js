import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../lib/context";

function AuthCheck(props) {
  const { username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!username) {
      router.push("/enter");
    }
  }, [username]);

  return username ? props.children : props.fallback || <p>Redirecting...</p>;
}

export default AuthCheck;
