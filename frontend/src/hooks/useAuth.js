// // src/hooks/useAuth.js
// import { useEffect, useState } from "react";
// import { auth, googleProvider } from "../firebase";
// import {
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";

// export default function useAuth() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//         setUser({
//           uid: firebaseUser.uid,
//           email: firebaseUser.email,
//           name: firebaseUser.displayName,
//           photo: firebaseUser.photoURL,
//         });
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const loginWithGoogle = async () => {
//     await signInWithPopup(auth, googleProvider);
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   return { user, loading, loginWithGoogle, logout };
// }


// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  onAuthStateChanged,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Track auth state (login/logout)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", token);

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
        });
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // Refresh token automatically when Firebase rotates it
  useEffect(() => {
    const unsub = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true);
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
  };

  return { user, loading, loginWithGoogle, logout };
}
