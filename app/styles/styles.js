import {StyleSheet} from "react-native";
import colors from "../settings/colors";

export const textStyles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontFamily: 'montserrat',
    },
    title: {
        fontSize: 24,
        paddingTop: 20,
        paddingHorizontal: 20,
        fontFamily: 'montserrat'
    },
    subtitle: {
        fontSize: 14,
        paddingLeft: 20,
        paddingRight: 10,
        padding: 9,
        fontFamily: 'montserrat'
    },
    button: {
        fontSize: 14,
        color: colors.foodblocksRed,
        fontFamily: 'montserrat'
    },
    circleText: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'montserrat'
    },
    body: {
        fontSize: 14,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
        padding: 2,
    },
});


export const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },
    selector: {
        padding: 20,
        borderRadius: 20,
        elevation: 5,
        alignSelf: 'center',
        height: '87%',
        width: '90%',
    },
});

export const checkBoxStyle = StyleSheet.create({
    title: {
        fontSize: 14,
        padding: 10,
        fontFamily: 'montserrat',
        color: colors.darkGrey,
    },
    container: {
        padding: 10,
        alignSelf: 'center',
        flexDirection: 'row',
    },
});
