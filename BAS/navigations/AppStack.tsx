import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RecoIntroScreen from "../screens/ReconIntroScreen";
import FaceDetectionScreen from "../screens/FaceDetectionScreen";
import AppTab from "./AppTab";
import ChatScreen from "../screens/ChatScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="tabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="tabs" component={AppTab} />
      <Stack.Screen name="reconIntro" component={RecoIntroScreen} />
      {/* <Stack.Screen name="detect" component={FaceDetectionScreen} /> */}
    </Stack.Navigator>
  );
};

export default AppStack;
