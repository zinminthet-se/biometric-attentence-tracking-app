import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RecoIntroScreen from "../screens/ReconIntroScreen";
import FaceDetectionScreen from "../screens/FaceDetectionScreen";
import AppTab from "./AppTab";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
      <Stack.Screen name="reconIntro" component={RecoIntroScreen} />
      {/* <Stack.Screen name="detect" component={FaceDetectionScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack;
