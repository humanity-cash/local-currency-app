import React, { ReactElement } from 'react';
import { ThemeProvider } from "react-native-elements";
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import UserProvider from './api/context';
import AuthProvider from './auth';
import useCachedResources from "./hooks/useCachedResources";
import { MainNavigationStack } from './navigation/MainNavigationStack';
import LoadingPage from './screens/loadings/LoadingPage';
import store from './store';
import { theme } from "./theme/theme";

export default function App(): ReactElement | null {
	const resourceLoaded = useCachedResources();
	if (!resourceLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<AuthProvider>
					<UserProvider>
						<ThemeProvider theme={theme}>
							<MainNavigationStack />
							<LoadingPage />
							<Toast ref={(ref) => Toast.setRef(ref)} />
						</ThemeProvider>
					</UserProvider>
			</AuthProvider>
		</Provider>
	);
}
