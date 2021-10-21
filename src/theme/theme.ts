import { colors } from "./colors";
import { FontFamily } from "./elements";
import { Theme } from "react-native-elements";

export const theme: Theme = {
	Text: {
		style: {
			fontFamily: FontFamily.default,
			color: colors.text,
			fontSize: 16,
			lineHeight: 24
		},
		h1Style: {
			fontFamily: FontFamily.bold,
			fontSize: 40,
			color: colors.darkGreen1,
			lineHeight: 36,
			paddingTop: 20,
			marginBottom: 10
		},
		h2Style: {
			fontFamily: FontFamily.default,
			fontSize: 20,
			lineHeight: 24
		},
		h3Style: {
			textTransform: 'uppercase',
			fontSize: 10,
			lineHeight: 12,
		}
	}
};
