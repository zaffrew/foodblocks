import React from 'react'

import styles from './styles'

export default class FoodBlock extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source = {require('assets/beans.png')}/>
            </View>
        );
    }
}
