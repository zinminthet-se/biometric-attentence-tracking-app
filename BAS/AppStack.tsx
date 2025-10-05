import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import RecoIntroScreen from "./screens/ReconIntroScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="reconIntro" component={RecoIntroScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
