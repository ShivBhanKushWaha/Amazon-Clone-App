// in expo the output screen is only your phone device screen where you login by expo account to run sdk use npm start
// to built expo app - npx create-expo-app projectName
// - cd projectName
// - npx expo start
// - npm start - to run in the metro
//  to clear cache and run again when some error occured - npm start --reset-cache

// › Using Expo Go press these keyword in terminal
// › Press s │ switch to development build

// › Press a │ open Android
// › Press w │ open web

// › Press j │ open debugger
// › Press r │ reload app
// › Press m │ toggle menu
// › Press o │ open project code in your editor

// › Press ? │ show all commands

// to set up tailwind css in react native follow these steps
// npm add postcss@8.4.23
// npm add --dev tailwindcss@3.3.2
// npm add nativewind

// to use tailwind css in all componets wrap into the tailwind provide 

// to install navigation follow these steps
// npm i @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context 
// npm install @react-navigation/bottom-tabs
// for icons https://icons.expo.fyi/

import { TailwindProvider } from 'tailwindcss-react-native';
import StackNavigator from './navigation/StackNavigator';
import {Provider} from 'react-redux'
import store from './store';
import { ModalPortal } from 'react-native-modals';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <UserContext>
          <StackNavigator/>
          <ModalPortal/>
        </UserContext>
      </Provider>
    </TailwindProvider>
  );
}
