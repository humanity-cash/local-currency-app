import React, { ReactElement } from 'react';
import { ThemeProvider } from "react-native-elements";
import Toast from 'react-native-toast-message';
import { MainNavigationStack } from './navigation/MainNavigationStack'
import 'react-native-gesture-handler';
import useCachedResources from "./hooks/useCachedResources";
import { theme } from "./theme/theme";
import AuthProvider from './auth';
import LoadingPage from './screens/loadings/LoadingPage';
import store from './store';
import { Provider } from 'react-redux';

export default function App(): ReactElement | null {
	const resourceLoaded = useCachedResources();
	if (!resourceLoaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<MainNavigationStack />
					<LoadingPage />
					<Toast ref={(ref) => Toast.setRef(ref)} />
				</ThemeProvider>
			</AuthProvider>
		</Provider>
	);
}
