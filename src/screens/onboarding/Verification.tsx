import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, ConfirmationCode, Header } from "src/shared/uielements";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type VerificationProps = {
    navigation?: any
    route?: any
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        color: colors.darkGreen,
        lineHeight: 30
	},
    codeView: {
        flex: 1
    },
    bottomNavigation: {
        justifyContent: "center",
        color: colors.darkGreen,
        fontWeight: 'bold'
    },
    bottomView: {
        height: 60,
        justifyContent: "center",
        alignItems: 'center'
    }
});

const VALID_CODE = '123456';

const VerificationView = (props: VerificationProps) => {
    const [noCodeReceived, setNoCodeReceived] = useState(false);
    const { personalDetails: { phoneCountry, phoneNumber } } = useUserDetails();

    const onComplete = (text: string) => {
        if (text === VALID_CODE) {
            props.navigation.navigate('Password')
            return;
        }
    }

    return (
        <View style={viewBaseWhite}>
            <Header
                leftComponent={<BackBtn onClick={() => props.navigation.goBack()} color={colors.darkGreen} />}
            />

            <View style={{ ...wrappingContainerBase, flex: 1 }}>
                <View style={ { ...baseHeader} }>
                    {!noCodeReceived && <Text style={styles.headerText}>Verify your mail address</Text>}
                    {noCodeReceived && <Text style={styles.headerText}>Enter verification code</Text>}
                </View>
                <View style={styles.codeView}>
                    {!noCodeReceived && (<Text style={{color: colors.darkGreen}}>We have sent an email with a verification code to myname@mail.com</Text>)}
                    {noCodeReceived && (<Text style={{color: colors.darkGreen}}>We have sent another message with a new verification code to myname@mail.com</Text>)}
                    <ConfirmationCode onComplete={onComplete} />
                </View>
            </View>
            {!noCodeReceived && (
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => {
                            setNoCodeReceived(true);
                            Keyboard.dismiss();
                        }}>
                            <Text style={styles.bottomNavigation}>Send code again</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
            {noCodeReceived && (
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <View style={styles.bottomView}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('VerificationHelp')}>
                            <Text style={styles.bottomNavigation}>Need help?</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
        </View>
    );
}

const Verification = (props:VerificationProps) => {
    const navigation = useNavigation();
    return <VerificationView {...props} navigation={navigation} />;
}
export default Verification