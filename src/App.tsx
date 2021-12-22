import React, { ReactElement } from 'react';
import { ThemeProvider } from "react-native-elements";
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { NavigationProvider } from 'src/contexts';
import { UserProvider, AuthProvider, WalletProvider, EventsProvider } from './contexts';
import useCachedResources from "./hooks/useCachedResources";
import { MainNavigationStack } from './navigation/MainNavigationStack';
import store from './store';
import { theme } from "./theme/theme";

export default function App(): ReactElement | null {
	const resourceLoaded = useCachedResources();
	if (!resourceLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
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
		</Provider>
	);
}
