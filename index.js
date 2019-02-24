/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Feed from './src/components/Feed';
import Login from './src/screens/Login';

AppRegistry.registerComponent(appName, () => Login);
