import React from 'react'

import {View} from 'react-native'
import InteractiveTextImage from "./InteractiveTextImage";

import homeButton from '../../assets/homeButton.png'
import forYou from '../../assets/forYou.jpg'
import grocceries from '../../assets/grocceries.png'
import meals from '../../assets/plate.jpeg'


export default class Tabs extends React.Component {


    render() {
        return (
            <View style = {[styles.centeredContainer,{flexDirection: 'row',flex: 1/7, backgroundColor: 'lightgrey'}]}>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 15}]} width = {50} height = {50} image={homeButton} text = {'Home'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 15}]} width = {50} height = {50} image={forYou} text = {'For You'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 14}]} width = {50} height = {50} image={grocceries} text = {'Groceries'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 15}]} width = {50} height = {50} image={meals} text = {'Meals'}/>
            </View>
        );
    }
}
