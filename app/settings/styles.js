import {StyleSheet} from "react-native";
import colors from "./colors";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    foodName: {
        fontFamily: 'montserrat',
        fontSize: 16,
        color: colors.foodblocksRed,
    },

    subtitle: {
        fontFamily: 'montserrat',
        fontSize: 30,
        textAlign: "center",
        paddingBottom: 20,
    },

    heading: {
        fontFamily: 'montserrat',
        fontSize:
            20,
        color:
            'white',
        padding: 20,
    },

    greeting: {
        fontFamily: 'montserrat',
        fontSize:
            35,
    },

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
    }
});
