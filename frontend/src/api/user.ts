import axiosClient from "./axiosClient";

export const getMe = async (
  token: string,
  callback: any,
  errorCallback: any
) => {
  try {
    const configs = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axiosClient.get("/user/info/me", configs);
    callback(res.data);
  } catch (err) {
    errorCallback ? errorCallback(err) : null;
  }
};
