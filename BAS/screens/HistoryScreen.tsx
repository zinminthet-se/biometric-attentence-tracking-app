import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "../constants/icons";
import images from "../constants/images";
import { useLoginStore } from "../stores/authDataStore";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../services/api-client";

const HistoryScreen = () => {
  const navigation = useNavigation();
  const profileData = useLoginStore((state) => state.profileData);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await apiClient.get(
          `/records/user/${profileData.userId}`
        );
        setRecords((records) => response.data.data.records);
      } catch (error) {
        throw error;
      }
    };

    fetchRecords();
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row justify-between items-center bg-white ml-2 mr-2 mb-2">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={icons.backArrow} className="size-8 m-2" />
        </TouchableOpacity>
        <Text className="font-rubik-bold font-bold text-2xl">History</Text>
        <TouchableOpacity>
          <Image source={icons.person} className="w-12 h-12 rounded-full" />
        </TouchableOpacity>
      </View>
      <View className="m-2 bg-blue-200 p-4 rounded-t-lg ">
        <Text className="font-bold mb-5">October - 2025</Text>
        <View className="flex-row justify-between">
          <Text className="text-black-200 text-xs">Total Records</Text>
          <Text className="text-black-200 text-xs">Roll Call</Text>
        </View>
        <Text className="text-black-300 text-xs">{records.length}</Text>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="ml-2 mr-2 flex-col gap-2"
      >
        {records.length > 0 ? (
          records.map((record) => {
            const isoDateString = record.date; // Your ISO 8601 date string
            const date = new Date(isoDateString);

            // Format the date to a readable string
            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "long", // "Monday"
              year: "numeric", // "2025"
              month: "long", // "October"
              day: "numeric", // "8"
            });
            return (
              <View
                className="flex-row items-center justify-around border rounded-lg border-gray-300"
                key={record._id}
              >
                <Image source={images.attendance} className="size-12" />
                <View className="flex-col">
                  <Text className="font-bold text-xs text-gray-500">
                    KPTM-{profileData.rollNumber}
                  </Text>
                  <Text className="font-bold text-xs text-gray-800">
                    Date: {formattedDate}
                  </Text>
                </View>
                <View className="flex-col m-2 gap-2">
                  <Text className="text-xs font-bold ml-2">Status</Text>
                  <Text
                    className={`${
                      record.status !== "absent" ? "bg-green-600" : "bg-red-600"
                    } text-white rounded-lg text-xs p-2`}
                  >
                    {record.status}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <></>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
