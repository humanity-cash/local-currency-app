import { colors } from "./colors";
import { Theme } from "react-native-elements";

export const theme: Theme = {
	Text: {
		style: {
			fontFamily: 'IBMPlexSans',
			color: colors.text,
			fontSize: 16,
			lineHeight: 24
		},
		h1Style: {
			fontFamily: 'IBMPlexSansBold',
			fontSize: 40,
			lineHeight: 36,
			paddingTop: 20,
			marginBottom: 10
		},
		h2Style: {
			fontFamily: 'IBMPlexSans',
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
