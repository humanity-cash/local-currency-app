import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";

interface ToggleButtonProps {
	value: boolean,
    onChange: ()=>void,
    style?: IMap,
    activeText?: string,
    inActiveText?: string,
    textStyle?: IMap,
    circleStyle?: IMap
}

const ToggleButton = (props: ToggleButtonProps): JSX.Element => {

	return (
		<View style={{
            ...styles.container,
            ...props.style
        }}>
            {props.value && (
                <View style={styles.contentView}>
                    <TouchableOpacity style={{
                        ...styles.activeButton,
                        ...props.circleStyle
                    }}>
                        <Text style={styles.activeColor}> {props.activeText} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inActive} onPress={props.onChange}>
                        <Text style={props.textStyle}> {props.inActiveText} </Text>
                    </TouchableOpacity>
                </View>
            )}
            {!props.value && (
                <View style={styles.contentView}>
                    <TouchableOpacity style={styles.inActive} onPress={props.onChange}>
                        <Text style={props.textStyle}> {props.activeText} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        ...styles.activeButton,
                        ...props.circleStyle
                    }}>
                        <Text style={styles.activeColor}> {props.inActiveText} </Text>
                    </TouchableOpacity>
                </View>
            )}
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
        width: 210,
        height: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: colors.darkGreen,
        backgroundColor: colors.white
    },
    contentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    activeButton: {
        width: 100,
        height: 36,
        marginHorizontal: 1,
        marginTop: 1,
        borderRadius: 39,
        backgroundColor: colors.darkGreen,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inActive: {
        width: 100,
        height: 36,
        borderRadius: 39,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeColor: {
        color: colors.white
    }
});

export default ToggleButton;