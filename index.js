/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

import Feed from './src/components/Feed';
import Login from './src/screens/Login';

Navigation.registerComponent('navigation.playground.Login', () => Login);
Navigation.registerComponent('navigation.playground.Feed', () => Feed);

AsyncStorage.getItem('token')
    .then(token => {
      if (token) {
        Navigation.setRoot({
          root: {
            component: {
              name: 'navigation.playground.Feed',
            }
          }
        })
      }
      else
      Navigation.setRoot({
        root: {
          component: {
            name: 'navigation.playground.Login'
          }
        }
      })
    })
    .then(screen =>
      Navigation.events().registerAppLaunchedListener({ screen })
);
