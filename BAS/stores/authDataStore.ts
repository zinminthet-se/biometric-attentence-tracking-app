import { create } from "zustand";
import * as Keychain from "react-native-keychain";
import AsyncStorage from "@react-native-async-storage/async-storage";

type loginStore = {
  rollNumber: string;
  token: string | null;
  profileData: {
    name: null | string;
    phoneNumber: null | string;
    email: null | string;
    rollNumber: null | string;
    university: null | string;
  };
  login: (rollNumber: string, password: string, token: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: (
    name: string,
    phoneNumber: string,
    email: string,
    rollNumber: string,
    university: string
  ) => Promise<void>;
};

export const useLoginStore = create<loginStore>((set) => ({
  rollNumber: "0",
  profileData: {
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

    set({ token, rollNumber: rollNumber });
  },
  hydrate: async (name, phoneNumber, email, rollNumber, university) => {
    const profileData = {
      name,
      phoneNumber,
      rollNumber,
      email,
      university,
    };
    await AsyncStorage.setItem("@profileData", JSON.stringify(profileData));
    set({ profileData: profileData });
  },
  logout: async () => {
    set({
      token: null,
      rollNumber: "0",
      profileData: {
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
