import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';
import AppNavigation from './navigations/AppNavigation';

//Ignore all log notifications
LogBox.ignoreAllLogs();

export default function App() {
  return (
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
  );
}