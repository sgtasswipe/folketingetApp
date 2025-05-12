import { registerRootComponent } from 'expo';
import App from './App';
import { LogBox } from 'react-native';

// Ignore specific Firebase-related warnings
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted',
  'Possible Unhandled Promise Rejection'
]);

// Register the root component
registerRootComponent(App);