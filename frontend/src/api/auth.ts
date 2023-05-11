import axiosClient from "./axiosClient";
import { SignInUser, SignUpUser } from "@models/user.model";

export const signInAsCustomer = async (
  params: SignInUser,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/auth/signin", params);
    return res.data;
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signUpAsCustomer = async (
  params: SignUpUser,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/auth/signup", params);
    return res.data;
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signInAsAdmin = async (params: SignInUser, errorCallback: any) => {
  try {
    const res = await axiosClient.post("/auth/admin/signin", params);
    return res.data;
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signUpAsAdmin = async (params: SignUpUser, errorCallback: any) => {
  try {
    const res = await axiosClient.post("/auth/admin/signup", params);
    return res.data;
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};
