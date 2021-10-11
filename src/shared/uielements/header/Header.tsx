import { useIsFocused } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from "react";
import { Dimensions, Platform, StatusBar } from "react-native";
import { Header as HeaderComponent } from "react-native-elements";
import { useModalStatusBar } from "src/hooks";
import { colors } from "src/theme/colors";
import { ModalStatusBar } from "src/utils/types";

type HeaderProps = {
	leftComponent?: ReactElement,
	centerComponent?: ReactElement,
	rightComponent?: ReactElement,
	style?: any,
	barStyle?: 'dark-content' | 'light-content' | 'default',
	placement?: 'left' | 'right' | 'center',
	children?: ReactElement
}

export const HEADER_HEIGHT = Dimensions.get("window").height * 0.1;

const Header = (props: HeaderProps) => {
	const { properties } = useModalStatusBar();
	const isFocused = useIsFocused();
	const [modalProps, setModalProps] = useState<ModalStatusBar>({
		show: false,
		styles: {}
	});

	useEffect(() => {
		if (Platform.OS == "android" && isFocused) {
			const { style } = props;
			const modalColor = modalProps.styles && modalProps.styles.backgroundColor;
			const bgColor = style && style.backgroundColor ? style.backgroundColor : colors.lightBg;
			StatusBar.setBarStyle( modalProps.bar || props.barStyle || 'dark-content',true)
			StatusBar.setBackgroundColor(modalColor || bgColor);
		}
	}, [modalProps, isFocused]);

	useEffect(() => {
		setModalProps({
			show: properties.show,
			styles: properties.styles,
			bar: properties.bar,
		})
	}, [properties]);



	return (
		<HeaderComponent
			placement={props.placement || 'center'}
			statusBarProps={{ barStyle: (modalProps.bar || props.barStyle || 'dark-content')}}
			barStyle={props.barStyle || 'dark-content'} // or directly
			leftComponent={props.leftComponent}
			rightComponent={props.rightComponent}
			centerComponent={props.centerComponent}
			containerStyle={{
				borderBottomColor:'transparent',
				borderBottomWidth:0,
				backgroundColor: 'transparent',
				height: HEADER_HEIGHT,
				...props.style,
				...modalProps.styles
			}}
		>
			{props?.children}
		</HeaderComponent>
	);
};

export default Header;