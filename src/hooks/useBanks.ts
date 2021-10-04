import { createStore, useStore } from "react-hookstore";
import { IMap } from "src/utils/types";
import { UserAPI } from "src/api";

const storeId = 'BANK_STATUS';

interface BankStatusState {
	hasPersonalBank: boolean,
	hasBusinessBank: boolean
};

const store = createStore<BankStatusState>(storeId, {
	hasPersonalBank: false,
	hasBusinessBank: false
});

const useBankStatus = (): IMap => {
	const [details] = useStore<BankStatusState>(storeId);

	const getBankStatus = async (dwollaId: string, mode: boolean) => {
		const response = await UserAPI.getFundingSources(dwollaId);
		if (response.data && response.data.body._embedded["funding-sources"].length > 0) {
			mode ? setBusinessBankStatus(true) : setPersonalBankStatus(true);
		} else {
			mode ? setBusinessBankStatus(false) : setPersonalBankStatus(false);
		}
	}

	const setBusinessBankStatus = (value: boolean) => {
		store.setState({
			...details,
			hasBusinessBank: value
		});
	}

	const setPersonalBankStatus = (value: boolean) => {
		store.setState({
			...details,
			hasPersonalBank: value
		});
	}

	return {
		details,
		getBankStatus,
		setBusinessBankStatus,
		setPersonalBankStatus
	}
};

export default  useBankStatus;