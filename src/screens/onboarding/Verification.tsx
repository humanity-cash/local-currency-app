import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, ConfirmationCode, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type VerificationProps = {
    navigation?: any
    route?: any
}

const styles = StyleSheet.create({
    codeView: {
        flex: 1
    },
    bottomNavigation: {
        justifyContent: "center"
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
            props.navigation.navigate('Passcode')
            return;
        }
    }

    return (
        <View style={viewBase}>
            <Header
                leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
            />

            <View style={{ ...wrappingContainerBase, flex: 1 }}>
                <View style={ { ...baseHeader} }>
                    <Text h1>Enter verification code</Text>
                </View>
                <View style={styles.codeView}>
                    {!noCodeReceived && (<Text>We have sent a message with a verification code to {phoneCountry} {phoneNumber}.</Text>)}
                    {noCodeReceived && (<Text>We have sent another message with a new verification code to {phoneCountry} {phoneNumber}. Click back if you need to change your phone number.</Text>)}
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
                            <Text style={styles.bottomNavigation}>No code received?</Text>
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