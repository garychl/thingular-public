import { UserContext } from "../lib/context";
import { useEffect, useState, useCallback, useContext } from "react";
import SignInWidget from "../components/SignInWidget";
import SignInSuccessWidget from "../components/SignInSuccessWidget";
import UsernameForm from "../components/UsernameForm";
import { useRouter } from "next/router";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (username) {
      router.push("/");
    }
  }, [username]);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        username ? (
          <p>redirecting...</p>
        ) : (
          <UsernameForm />
        )
      ) : (
        <SignInWidget />
      )}
    </main>
  );
}
