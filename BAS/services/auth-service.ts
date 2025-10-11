import axios from "axios";
import apiClient from "./api-client";
import { useLoginStore } from "../stores/authDataStore";

export type Success = {
  status: string;
  data: {
    token: string;
    user: {
      _id: string;
      profileImage: string;
      name: string;
      email: string;
      phoneNumber: string;
      rollNumber: string;
      year: string;
      role: string;
      haveFaceSample: string;
      university: "" | string;
    };
  };
};

export interface LoginProps {
  rollNumber: string;
  password: string;
  setLoading: (state: boolean) => void;
  setSuccessVisible: (state: boolean) => void;
  setAlertMessage: (message: string) => void;
  toggleAlertModal: (state: boolean) => void;
  login: (rollNumber: string, token: string) => Promise<void>;
  logout?: () => Promise<void>;
  hydrate: (
    name: string,
    phoneNumber: string,
    email: string,
    rollNumber: string,
    university: string,
    userId: string
  ) => Promise<void>;
}

export const handlelogin = async ({
  rollNumber,
  password,
  setLoading,
  setSuccessVisible,
  setAlertMessage,
  toggleAlertModal,
  login,
  logout,
  hydrate,
}: LoginProps) => {
  const controller = new AbortController();
  try {
    setLoading(true);
    const response = await apiClient.post<Success>(
      "/auth/user/login",
      { rollNumber, password },
      { signal: controller.signal }
    );
    const userData = { ...response.data.data.user };
    console.log("this is userdata", userData);
    const token = response.data.data.token;
    console.log("this is token", token);
    console.log(response.data);
    await login(userData.rollNumber, token);
    await hydrate(
      userData.name,
      userData.phoneNumber,
      userData.email,
      userData.rollNumber,
      userData.university,
      userData._id
    );
    setLoading(false);
    setSuccessVisible(true);
  } catch (error) {
    console.log("this is errro", error);
    const errorMessage = error.response.data.message;
    setLoading(false);
    setAlertMessage(errorMessage || "");
    toggleAlertModal(true);
    throw error;
  } finally {
  }
};
