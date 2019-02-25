/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import Feed from './src/components/Feed';
import Login from './src/screens/Login';

Navigation.registerComponent('Login', () => Login);
Navigation.registerComponent('Feed', () => Feed);

AsyncStorage.getItem('token')
    .then(token => {

      if(token) {
        return {
            name: "Feed",
            title: "Feed"
        };
      }

      return {
        name: "Login",
        title: "Login"
      };
    }).then(screen => 
        Navigation.events().registerAppLaunchedListener(() => {
            Navigation.setRoot({
              root: {
                component: screen
              }
            });
    }));
