import axiosClient from "./axiosClient";
import { SignInUser, SignUpUser } from "@models/user.model";

export const signInAsStandard = async (
  params: SignInUser,
  callback: any,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/signin", params);
    callback(res.data);
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signUpAsStandard = async (
  params: SignUpUser,
  callback: any,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/signup", params);
    callback(res.data);
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signInAsAdmin = async (
  params: SignInUser,
  callback: any,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/admin/signin", params);
    callback(res.data);
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};

export const signUpAsAdmin = async (
  params: SignUpUser,
  callback: any,
  errorCallback: any
) => {
  try {
    const res = await axiosClient.post("/admin/signup", params);
    callback(res.data);
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};
