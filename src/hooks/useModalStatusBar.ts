import { colors } from "../theme/colors";
import { createStore, useStore } from "react-hookstore";
import { ModalStatusBar } from "../utils/types";

const storeId = 'MODAL_STATUSBAR';

const headerValues = {
	styles: { backgroundColor: colors.black },
	bar: 'light-content'
}
type ModalStatusBarState = ModalStatusBar;

const store = createStore<ModalStatusBarState>(storeId, {
	show: false,
	styles: {}
});

export const useModalStatusBar = () => {
	const [details] = useStore<ModalStatusBarState>(storeId);

	const setUseHeader = (value: boolean) => {
		if (value) {
			store.setState({
				show: value,
				styles: headerValues.styles,
				bar: 'light-content'
			});
		}
		if (!value) {
			store.setState({
				show: value,
				styles: { },
				bar: undefined
			});
		}
	}

	return {
		properties: details,
		setUseHeader
	}
};