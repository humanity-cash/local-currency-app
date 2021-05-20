import React, { useEffect } from 'react';
import { ThemeProvider } from "react-native-elements";
import { MainNavigationStack } from './navigation/MainNavigationStack'
import 'react-native-gesture-handler';
import useCachedResources from "./hooks/useCachedResources";
import { theme } from "./theme/theme";
import { useUserDetails } from "./hooks/useUserDetails";


export default function App() {
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
