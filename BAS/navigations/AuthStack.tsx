import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginForm from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import AppTab from "./AppTab";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="tabs" component={AppTab} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
