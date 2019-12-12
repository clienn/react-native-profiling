import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from "./screens/SignInScreen.js"
import ScannerScreen from "./screens/ScannerScreen"
import HomeScreen from "./screens/HomeScreen"
import DashboardScreen from "./screens/DashboardScreen"
import AccountInformation from "./screens/AccountInformation"
import Configuration from "./screens/ConfigurationScreen"

const AppStack = createStackNavigator({Home: HomeScreen, SignIn: SignInScreen, Configuration: Configuration, Scanner: ScannerScreen, DashBoard:DashboardScreen, AccountInformation:AccountInformation});
// const AuthStack = createStackNavigator({ Login: LoginScreen });
// const AppStack = createStackNavigator({SignUp: SignUpScreen});

export default createAppContainer(
  createSwitchNavigator(
    {
      // AuthLoading: AuthLoadingScreen,
      App: AppStack,
      // Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    }
  )
);