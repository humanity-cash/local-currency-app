import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListOfSteps from "../views/missingSteps/ListOfSteps";
import MissingPersonalInfo from "../views/missingSteps/MissingPersonalInfo";
import MissingPersonalDetails from "../views/missingSteps/MissingPersonalDetails";
import MissingPersonalAddress from "../views/missingSteps/MissingPersonalAddress";
import MissingTerms from "../views/missingSteps/MissingTerms";
import MissingTermsList from "../views/missingSteps/MissingTermsList";
import MissingAddCashInfo from "../views/missingSteps/MissingAddCashInfo";
import MissingAddCash from "../views/missingSteps/MissingAddCash";
import MissingSelectPayment from "../views/missingSteps/MissingSelectPayment";
import MissingDeposit from "../views/missingSteps/MissingDeposit";
import ModalConfirmPin from "../views/authentication/ModalConfirmPin";
import MissingCreditCard from "../views/missingSteps/MissingCreditCard";
import MissingAddCashResult from "../views/missingSteps/MissingAddCashResult";
import MissingPickCard from "../views/missingSteps/MissingPickCard";

const MissingStepsStack = createStackNavigator()
function MissingStepsStackScreen(props: MissingStepsStackProps) {
	return (
		<MissingStepsStack.Navigator
			screenOptions={({ route, navigation }) => ({
				headerShown: false
			})}
		>
			<MissingStepsStack.Screen name="ListOfSteps" initialParams={props} component={ListOfSteps} />
			<MissingStepsStack.Screen name="MissingPersonalInfo" initialParams={props} component={MissingPersonalInfo} />
			<MissingStepsStack.Screen name="MissingPersonalDetails" initialParams={props} component={MissingPersonalDetails} />
			<MissingStepsStack.Screen name="MissingPersonalAddress" initialParams={props} component={MissingPersonalAddress} />
			<MissingStepsStack.Screen name="MissingTerms" initialParams={props} component={MissingTerms} />
			<MissingStepsStack.Screen name="MissingTermsList" initialParams={props} component={MissingTermsList} />
			<MissingStepsStack.Screen name="MissingAddCashInfo" initialParams={props} component={MissingAddCashInfo} />
			<MissingStepsStack.Screen name="MissingAddCash" initialParams={props} component={MissingAddCash} />
			<MissingStepsStack.Screen name="MissingSelectPayment" initialParams={props} component={MissingSelectPayment} />
			<MissingStepsStack.Screen name="MissingDeposit" initialParams={props} component={MissingDeposit} />
			<MissingStepsStack.Screen name="MissingConfirmPin" initialParams={props} component={ModalConfirmPin} />
			<MissingStepsStack.Screen name="MissingAddCashResult" initialParams={props} component={MissingAddCashResult} />
			<MissingStepsStack.Screen name="MissingPickCard" initialParams={props} component={MissingPickCard} />
			<MissingStepsStack.Screen name="MissingCreditCard" initialParams={props} component={MissingCreditCard} />
		</MissingStepsStack.Navigator>
	);
}

type MissingStepsStackProps = {
	onClose: () => void
	style?: any
}

export const MissingStepsNavigator = MissingStepsStackScreen
