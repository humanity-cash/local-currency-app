import React, { ReactElement } from 'react';
import { ThemeProvider } from "react-native-elements";
import Toast from 'react-native-toast-message';
import { MainNavigationStack } from './navigation/MainNavigationStack'
import 'react-native-gesture-handler';
import useCachedResources from "./hooks/useCachedResources";
import { theme } from "./theme/theme";
import AuthProvider from './auth';

export default function App(): ReactElement | null {
	const resourceLoaded = useCachedResources();
	if (!resourceLoaded) {
		return null;
	}

	return (
		<AuthProvider>
			<ThemeProvider theme={theme}>
				<MainNavigationStack />
				<Toast ref={(ref) => Toast.setRef(ref)} />
			</ThemeProvider>
		</AuthProvider>
	);
}
