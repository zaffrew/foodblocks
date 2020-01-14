import {StyleSheet} from "react-native";


export default styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    content:{
        flex:1
    } ,

    foodblocksTitle: {
        fontFamily: 'montserrat',
        fontSize: 45,
        color: 'white'
    },

    foodName: {
        fontFamily: 'montserrat',
        fontSize: 16,
        color:  '#D32240'
    },

    subtitle: {
        fontFamily: 'montserrat',
        fontSize: 30,
        textAlign: "center",

    },

    heading: {
        fontFamily: 'montserrat',
        fontSize: 20,
    },

    greeting: {
        fontFamily: 'montserrat',
        fontSize: 35,
    },

    splashColor: {
        backgroundColor: '#D32240',
    },

    bottomView:{
 
        width: '100%', 
        height: 64, 
        backgroundColor: '#D32240', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
      },

});
