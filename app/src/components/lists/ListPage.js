import FoodBlockScroll from "../FoodBlockScroll";
import React from "react";
import {connect} from "react-redux";
import SafeView from "../SafeView";
import {Subheading, Title} from "react-native-paper";

export default connect((state, ownProps) => ({
    URLs: state.lists.find(({name}) => ownProps.list_name === name).URLs
}))(
    props => {
        const URLs = props.URLs ? props.URLs : []

        const mainContent = URLs.length > 0 ?
            <FoodBlockScroll blocksPerCrossAxis={2} blockLength={160} onPress={props.onPress} URLs={URLs}/> :
            <Subheading style={{alignSelf: 'center'}}> This list is empty!</Subheading>

        return (
            <SafeView style={{flex: 1}}>
                <Title style={{padding: 20, fontSize: 40, textAlign: 'center'}}>
                    {props.list_name}
                </Title>
                {mainContent}
            </SafeView>
        )
    }
)
