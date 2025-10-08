import { create } from "zustand";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";

type loginStore = {
  userId: string | null;
  rollNumber: string | null;
  token: string | null;
  isLoggedIn: boolean;
  profileData: {
    name: null | string;
    phoneNumber: null | string;
    email: null | string;
    rollNumber: null | string;
    university: null | string;
    userId: null | string;
  };
  login: (rollNumber: string, password: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: (
    name: string,
    phoneNumber: string,
    email: string,
    rollNumber: string,
    university: string,
    userId: string
  ) => Promise<void>;
};

export const useLoginStore = create<loginStore>((set) => ({
  userId: null,
  rollNumber: null,
  isLoggedIn: false,
  profileData: {
    userId: null,
    name: null,
    phoneNumber: null,
    rollNumber: null,
    email: null,
    university: null,
  },
  token: null,
  login: async (rollNumber, password, token) => {
    await Keychain.setGenericPassword("jwt_auth_token", token, {
      service: "api-jwt-token",
    });
    await Keychain.setGenericPassword("password", password, {
      service: "account_password",
    });

    set({ token, rollNumber: rollNumber, isLoggedIn: true });
  },
  hydrate: async (name, phoneNumber, email, rollNumber, university, userId) => {
    const profileData = {
      name,
      phoneNumber,
      rollNumber,
      email,
      university,
      userId,
    };
    await AsyncStorage.setItem("@profileData", JSON.stringify(profileData));
    set({ profileData: profileData });
  },
  logout: async () => {
    set({
      userId: null,
      token: null,
      rollNumber: null,
      isLoggedIn: false,
      profileData: {
        userId: null,
        name: null,
        email: null,
        phoneNumber: null,
        rollNumber: null,
        university: null,
      },
    });
    await Keychain.resetGenericPassword({ service: "api-jwt-token" });
    await Keychain.resetGenericPassword({ service: "account_password" });
    await AsyncStorage.removeItem("@profileData");
  },
}));
