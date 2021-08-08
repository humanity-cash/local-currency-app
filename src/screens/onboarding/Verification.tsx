import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, ConfirmationCode, Header, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type VerificationProps = {
    navigation?: any
    route?: any
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40
    },
    headerText: {
		fontSize: 32,
        color: colors.darkGreen,
        lineHeight: 32
	},
    bodyText: {
		color: colors.bodyText
	},
    codeView: {
        flex: 1,
        marginTop: 25
    },
    bottomNavigation: {
        alignSelf: "center",
        color: colors.darkGreen,
        fontWeight: 'bold',
        paddingVertical: 30
    },
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const VALID_CODE = '123456';

const VerificationView = (props: VerificationProps) => {
    const [noCodeReceived, setNoCodeReceived] = useState<boolean>(false);
    const [goNext, setGoNext] = useState<boolean>(false);
    const { personalDetails } = useUserDetails();

    const onComplete = (text: string) => {
        setGoNext(true);
    }

    return (
        <View style={viewBase}>
            <Header
                leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
            />

            <ScrollView style={wrappingContainerBase}>
                <View style={styles.container}>
                    <View style={baseHeader}>
                        {!noCodeReceived && <Text style={styles.headerText}>Verify your mail address</Text>}
                        {noCodeReceived && <Text style={styles.headerText}>Enter verification code</Text>}
                    </View>
                    {!noCodeReceived && (<Text style={styles.bodyText}>We have sent an email with a verification code to {personalDetails.email}</Text>)}
                    {noCodeReceived && (<Text style={styles.bodyText}>We have sent another message with a new verification code to {personalDetails.email}</Text>)}
                    <View style={styles.codeView}>
                        <ConfirmationCode onComplete={onComplete} />
                    </View>
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <View style={styles.bottomView}>
                    {!noCodeReceived && (
                        <TouchableOpacity onPress={() => {
                            setNoCodeReceived(true);
                            Keyboard.dismiss();
                        }}>
                            <Text style={styles.bottomNavigation}>Send code again</Text>
                        </TouchableOpacity>
                    )}
                    {noCodeReceived && (
                        <TouchableOpacity onPress={() => props.navigation.navigate('VerificationHelp')}>
                            <Text style={styles.bottomNavigation}>Need help?</Text>
                        </TouchableOpacity>
                    )}
                    <Button
                        type="darkGreen"
                        title="NEXT"
                        disabled={!goNext}
                        onPress={() => props.navigation.navigate("EmailConfirmed")}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const Verification = (props:VerificationProps) => {
    const navigation = useNavigation();
    return <VerificationView {...props} navigation={navigation} />;
}
export default Verification