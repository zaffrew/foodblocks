import React from 'react'

import {View} from 'react-native'
import InteractiveTextImage from "./InteractiveTextImage";

import homeButton from '../../assets/homeButton.png'
import forYou from '../../assets/forYou.png'
import grocceries from '../../assets/grocceries.png'
import meals from '../../assets/plate.png'
import search from '../../assets/search.png'


export default class Tabs extends React.Component {


    render() {
        return (
            <View style = {[styles.centeredContainer,{flexDirection: 'row',flex: 1/8, backgroundColor: '#D32240'}]}>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 12}]} width = {30} height = {30} image={homeButton} text = {'Home'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 12}]} width = {30} height = {30} image={forYou} text = {'For You'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 12}]} width = {30} height = {30} image={search} text = {'Search'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 12}]} width = {30} height = {30} image={grocceries} text = {'Groceries'}/>
                <InteractiveTextImage textStyle = {[styles.heading, {fontSize: 12}]} width = {30} height = {30} image={meals} text = {'Meals'}/>
            </View>
        );
    }
}
