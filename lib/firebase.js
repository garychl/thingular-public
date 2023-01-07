import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
  documentId,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "Your API Key",
  authDomain: "Your Auth Domain",
  projectId: "Your Project ID",
  storageBucket: "Your Storage Bucket",
  messagingSenderId: "Your Messaging Sender ID",
  appId: "Your App ID",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

export const firestore = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

export async function getUserWithUsername(username) {
  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}
export async function getUserWithUid(uid) {
  const q = query(
    collection(firestore, "users"),
    where(documentId(), "==", uid),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}
