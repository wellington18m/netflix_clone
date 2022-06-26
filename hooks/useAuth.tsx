import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from "firebase/auth";

import { useRouter } from "next/router";

import React, {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { auth } from "../firebase";

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setloading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/login");
      }
      setInitialLoading(false);
    });
  }, [user]);

  const signUp = async (email: string, password: string) => {
    setloading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setUser(credentials.user);
        console.log(credentials.user);
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const signIn = async (email: string, password: string) => {
    setloading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setUser(credentials.user);
        console.log(credentials.user);
        router.push("/");
      })
      .catch((error) => {
        alert(error);
        setloading(false);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const logOut = async () => {
    setloading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        router.push("/login");
      })
      .catch((error) => {
        alert(error);
        setloading(false);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logOut,
      loading,
      initialLoading,
    }),
    [user, loading, initialLoading]
  );
};

interface AuthProviderProps {
  children: React.ReactNode;
}

interface IAuth {
  user: User | null;
  loading: boolean;
  initialLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const authContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logOut: async () => {},
  loading: false,
  initialLoading: false,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthProvider();

  return (
    <authContext.Provider value={auth}>
      {!auth.initialLoading && children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
