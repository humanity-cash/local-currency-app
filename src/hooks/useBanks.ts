import { useState, useEffect, useContext } from "react";
import { AuthContext } from 'src/auth';
import { IMap } from "src/utils/types";
import { UserAPI } from "src/api";

const useBankStatus = (): IMap => {
	const { customerDwollaId, businessDwollaId } = useContext(AuthContext);
	const [hasPersonalBank, setHasPersonalBank] = useState<boolean>(false);
	const [hasBusinessBank, setHasBusinessBank] = useState<boolean>(false);

	useEffect(() => {
		if (customerDwollaId) {
			getBankStatus(customerDwollaId, false);
		}

		if (businessDwollaId) {
			getBankStatus(businessDwollaId, true);
		}
	}, [customerDwollaId, businessDwollaId]);

	const getBankStatus = async (dwollaId: string, mode: boolean) => {
		const response = await UserAPI.getFundingSources(dwollaId);
		if (response.data && response.data.body._embedded["funding-sources"].length > 0) {
			mode ? setHasBusinessBank(true) : setHasPersonalBank(true);
		} else {
			mode ? setHasBusinessBank(false) : setHasPersonalBank(false);
		}
	}

	return {
		hasPersonalBank,
		hasBusinessBank,
		setHasPersonalBank,
		setHasBusinessBank,
		getBankStatus,
	}
};

export default  useBankStatus;