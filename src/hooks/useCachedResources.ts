import * as Font from 'expo-font';
import * as React from 'react';
import { AntDesign, Entypo, Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const useCachedResources = () => {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				// Load fonts
				await Font.loadAsync({
					'IBMPlexSans': require('../../assets/fonts/IBMPlexSans-Regular.ttf'),
					'IBMPlexSansSemiBold': require('../../assets/fonts/IBMPlexSans-Medium.ttf'),
					'IBMPlexSansBold': require('../../assets/fonts/IBMPlexSans-SemiBold.ttf')
				});
				await Font.loadAsync(AntDesign.font);
				await Font.loadAsync(MaterialCommunityIcons.font);
				await Font.loadAsync(MaterialIcons.font);
				await Font.loadAsync(Entypo.font);
				await Font.loadAsync(Feather.font);
				await Font.loadAsync(FontAwesome.font);
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}

export default useCachedResources;