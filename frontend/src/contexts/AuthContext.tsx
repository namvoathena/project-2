// ** React Imports
import { createContext, useEffect, useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Axios
import { signInAsCustomer, signUpAsCustomer } from "api/auth";
import { getMe } from "api/user";

// ** Config
import authConfig from "configs/auth";
import { SignInUser, SignUpUser } from "@models/user.model";

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  isInitialized: false,
  setUser: () => null,
  setLoading: () => Boolean,
  setIsInitialized: () => Boolean,
  login: (params: SignInUser, errorCallback: () => void) => Promise<void>,
  logout: () => Promise<void>,
  register: (params: SignUpUser, errorCallback: () => void) => Promise<void>,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [isInitialized, setIsInitialized] = useState(
    defaultProvider.isInitialized
  );

  // ** Hooks
  const router = useRouter();
  useEffect(() => {
    const initAuth = async () => {
      setIsInitialized(true);
      const storedToken = window.localStorage.getItem(
        authConfig.storageTokenKeyName
      );
      if (storedToken) {
        setLoading(true);
        const res = await getMe(storedToken, (err) => {
          console.log(err);
          localStorage.removeItem(authConfig.storageTokenKeyName);
          setUser(null);
          router.push("/");
        });
        if (res.data) {
          const user: {
            access_token: string;
            id: string;
            name: string;
            role: string;
            username: string;
          } = res.data;
          setUser(user);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const handleLogin = async (params: SignInUser, errorCallback: () => void) => {
    const res = await signInAsCustomer(params, errorCallback);
    if (res.data) {
      const user: {
        access_token: string;
        id: string;
        name: string;
        role: string;
        username: string;
      } = res.data;
      window.localStorage.setItem(
        authConfig.storageTokenKeyName,
        user.access_token
      );
      setUser(user);
      const returnUrl = router.query.returnUrl;
      const redirectURL: any = returnUrl && returnUrl !== "/" ? returnUrl : "/";
      router.replace(redirectURL);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsInitialized(false);
    window.localStorage.removeItem(authConfig.storageTokenKeyName);
    router.push("/");
  };

  const handleRegister = async (
    params: SignUpUser,
    errorCallback: () => void
  ) => {
    const res = await signUpAsCustomer(params, errorCallback);
    if (res.data) {
      const user: {
        access_token: string;
        id: string;
        name: string;
        role: string;
        username: string;
      } = res.data;
      window.localStorage.setItem(
        authConfig.storageTokenKeyName,
        user.access_token
      );
      setUser(user);
      const returnUrl = router.query.returnUrl;
      const redirectURL: any = returnUrl && returnUrl !== "/" ? returnUrl : "/";
      router.replace(redirectURL);
    }
  };

  const values: any = {
    user,
    loading,
    isInitialized,
    setUser,
    setLoading,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
