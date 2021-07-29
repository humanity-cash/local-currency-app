import { createStore, useStore } from "react-hookstore";
import { DialogStatus } from "src/utils/types";

const storeId = 'DIALOG_STATUS';

type DialogStatusState = DialogStatus;

const store = createStore<DialogStatusState>(storeId, {
	visible: false,
});

const useDialogStatus = () => {
	const [details] = useStore<DialogStatusState>(storeId);

	const setDialogStatus = (value: boolean) => {
		if (value) {
			store.setState({
				visible: value,
			});
		}
		if (!value) {
			store.setState({
				visible: value,
			});
		}
	}

	return {
		properties: details,
		setDialogStatus
	}
};

export default  useDialogStatus;