import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import images from "../constants/images";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../services/api-client";

import { LoginProps, Success } from "../services/auth-service";
import { useLoginStore } from "../stores/authDataStore";
import { handlelogin } from "../services/auth-service";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [inputRollNumber, setInputRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const toggleAlertModal = () => {
    setAlertVisible(!isAlertVisible);
  };

  const toggleSuccessModal = () => {
    setSuccessVisible(!isSuccessVisible);
  };

  const login = useLoginStore((state) => state.login);
  const hydrate = useLoginStore((state) => state.hydrate);

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-4">
      <Image source={images.ucsLogo} className="w-32 h-32 rounded-full mb-6" />
      <Text className="text-xl font-bold mb-4">Login</Text>

      <TextInput
        placeholder="Roll Number"
        value={inputRollNumber}
        onChangeText={setInputRollNumber}
        className="w-full bg-white p-4 rounded-lg shadow mb-4"
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="w-full bg-white p-4 rounded-lg shadow mb-6"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={async () => {
          try {
            await handlelogin({
              rollNumber: inputRollNumber,
              password: password,
              setAlertMessage,
              setLoading,
              toggleAlertModal,
              setSuccessVisible,
              login,
              hydrate,
            });
          } catch (err) {
            // Catch unexpected errors that weren't handled internally
            console.error("Login failed unexpectedly:", err);
          }
        }}
        className="w-full bg-blue-500 py-4 rounded-lg items-center shadow"
      >
        <Text className="text-white font-bold">Login</Text>
      </TouchableOpacity>

      <Text className="text-gray-500">Or</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("signUp")}
        className="w-full bg-blue-500 py-4 rounded-lg items-center shadow"
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>

      {/* Error Modal */}
      <Modal
        transparent={true}
        visible={isAlertVisible}
        animationType="fade"
        onRequestClose={toggleAlertModal}
      >
        <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
          <View className="w-10/12 bg-white rounded-lg p-5 items-center">
            <Text className="text-lg font-bold text-red-500 mb-4">Error!</Text>
            <Text className="text-gray-700 text-center mb-6">
              {alertMessage}
            </Text>
            <TouchableOpacity
              onPress={toggleAlertModal}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        transparent={true}
        visible={isSuccessVisible}
        animationType="fade"
        onRequestClose={toggleSuccessModal}
      >
        <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
          <View className="w-10/12 bg-white rounded-lg p-5 items-center">
            <Text className="text-lg font-bold text-green-500 mb-4">
              Login Successful!
            </Text>
            <Text className="text-gray-700 text-center mb-6">Welcome back</Text>
            <TouchableOpacity
              onPress={() => {
                toggleSuccessModal();
                navigation.replace("tabs"); // Navigate after closing modal
              }}
              className="bg-blue-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading Modal */}
      <Modal
        transparent={true}
        visible={loading}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View className="flex-1 justify-center items-center bg-gray-200 bg-opacity-50">
          <View className="w-10/12 bg-white rounded-lg p-5 items-center">
            <ActivityIndicator size="large" color="#0000ff" />
            <Text className="text-gray-700 text-center mt-4">
              Logging in...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
