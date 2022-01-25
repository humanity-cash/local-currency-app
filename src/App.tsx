import moment from "moment";
import React, { ReactElement } from "react";
import { ThemeProvider } from "react-native-elements";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { NavigationProvider } from "src/contexts";
import {
  UserProvider,
  AuthProvider,
  WalletProvider,
  EventsProvider,
} from "./contexts";
import useCachedResources from "./hooks/useCachedResources";
import { MainNavigationStack } from "./navigation/MainNavigationStack";
import { theme } from "./theme/theme";

moment.locale("us-en");

const App = (): ReactElement | null => {
  const resourceLoaded = useCachedResources();
  if (!resourceLoaded) {
    return null;
  }

  return (
    <NavigationProvider>
      <UserProvider>
        <AuthProvider>
          <EventsProvider>
            <WalletProvider>
              <ThemeProvider theme={theme}>
                <MainNavigationStack />
                <Toast ref={(ref) => Toast.setRef(ref)} />
              </ThemeProvider>
            </WalletProvider>
          </EventsProvider>
        </AuthProvider>
      </UserProvider>
    </NavigationProvider>
  );
};

export default App;
