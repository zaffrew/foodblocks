import React from 'react'

import {View} from 'react-native'
import InteractiveTextImage from "./InteractiveTextImage";

import homeButton from '../../assets/homeButton.png'
import forYou from '../../assets/forYou.jpg'
import grocceries from '../../assets/grocceries.png'
import meals from '../../assets/plate.jpeg'
import searchButton from '../../assets/searchButton.png'


export default class Tabs extends React.Component {


    render() {
        return (
            <View style = {[styles.centeredContainer,{flexDirection: 'row',flex: 1/10, backgroundColor: '#E43938'}]}>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 10}]} width = {25} height = {25} image={homeButton} text = {'Home'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 10}]} width = {25} height = {25} image={grocceries} text = {'Groceries'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 10}]} width = {25} height = {25} image={searchButton} text={'Search'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 10}]} width = {25} height = {25} image={meals} text = {'Meals'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 10}]} width = {25} height = {25} image={forYou} text = {'Account'}/>
            </View>
        );
    }
}
