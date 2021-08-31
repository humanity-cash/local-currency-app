import { createStore, useStore } from "react-hookstore";
import { AccountType } from "src/utils/types";

const storeId = "ACCOUNT_TYPE";

type AccountTypeState = {
	accountType: AccountType
};

const store = createStore<AccountTypeState>(storeId, {
	accountType: AccountType.MERCHANT
});

const useAccountType = () => {
	const [details] = useStore<AccountTypeState>(storeId);

	const setUseAccountType = (value: AccountType) => {
		store.setState({
			accountType: value
		});
	}

	return {
		details,
		setUseAccountType
	}
};

export default useAccountType;