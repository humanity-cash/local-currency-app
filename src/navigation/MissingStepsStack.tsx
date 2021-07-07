import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ModalConfirmPin from "src/screens/authentication/ModalConfirmPin";
import ListOfSteps from "src/screens/missingSteps/ListOfSteps";
import MissingAddCash from "src/screens/missingSteps/MissingAddCash";
import MissingAddCashInfo from "src/screens/missingSteps/MissingAddCashInfo";
import MissingAddCashResult from "src/screens/missingSteps/MissingAddCashResult";
import MissingCreditCard from "src/screens/missingSteps/MissingCreditCard";
import MissingDeposit from "src/screens/missingSteps/MissingDeposit";
import MissingPersonalAddress from "src/screens/missingSteps/MissingPersonalAddress";
import MissingPersonalDetails from "src/screens/missingSteps/MissingPersonalDetails";
import MissingPersonalInfo from "src/screens/missingSteps/MissingPersonalInfo";
import MissingPickCard from "src/screens/missingSteps/MissingPickCard";
import MissingSelectPayment from "src/screens/missingSteps/MissingSelectPayment";
import MissingTerms from "src/screens/missingSteps/MissingTerms";
import MissingTermsList from "src/screens/missingSteps/MissingTermsList";

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
