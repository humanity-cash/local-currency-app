import React, { ReactElement } from 'react';
import { ThemeProvider } from "react-native-elements";
import { MainNavigationStack } from './navigation/MainNavigationStack'
import 'react-native-gesture-handler';
import useCachedResources from "./hooks/useCachedResources";
import { theme } from "./theme/theme";


export default function App(): ReactElement | null {
	const resourceLoaded = useCachedResources();
	if (!resourceLoaded) {
		return null;
	}

	return (
		<ThemeProvider theme={theme}>
			<MainNavigationStack />
		</ThemeProvider>
	);
}
