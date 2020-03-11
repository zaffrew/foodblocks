import React from 'react'
import {Image, ScrollView, StyleSheet, View} from 'react-native'
import SafeView from '../components/SafeView'
import {ActivityIndicator, Caption, Card, IconButton, Paragraph, Button, Surface, Provider, Modal, Portal, Title, Text} from "react-native-paper";
import styles from "../../settings/styles";
import {connect} from "react-redux";
import {ACTIONS} from "../state/State";
import moment from "moment";
import {getData} from "../scraper/Scraper";
import colors from '../../settings/colors';

//TODO: for air fryer oreos(R) the R doesnt show up as a trademark but rather just an R
//TODO: add nutrition values
//TODO: change the ordering of the page so the description isn't as big.

export default connect((state, ownProps) => {
    const saved = state.saved_recipes && state.saved_recipes.filter(URL => {
        return ownProps.URL === URL
    }).length === 1;

    return {saved}
}, {
    save: (URL) => ({
        type: ACTIONS.SAVE_RECIPE,
        URL
    }),
    unsave: (URL) => ({
        type: ACTIONS.UNSAVE_RECIPE,
        URL
    })
})

(class Food extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pressed: props.saved, visible: false,}
    }

    async componentDidMount() {
        this.setState({data: await getData(this.props.URL)})
    }

    componentDidUpdate() {
        if (this.props.saved !== this.state.pressed) {
            this.setState({pressed: this.props.saved})
        }
    }

    onPress() {
        const pressed = !this.state.pressed;
        this.setState({pressed});
        (pressed ? this.props.save : this.props.unsave)(this.state.data.URL);
    }

    _showModal = () => this.setState({ visible: true });
    _hideModal = () => this.setState({ visible: false });

    render() {
        const data = this.state.data;
        const {visible} = this.state;
        if (!data) {
            return <ActivityIndicator/>
        }
        const ingredients = data.ingredients.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>);

        const directions = data.directions.map((text, i) =>
            <Paragraph key={i} style={{padding: 5, fontSize: 12}}>{text}</Paragraph>);

        return (
            <SafeView style={{flex: 1, backgroundColor: colors.foodblocksRed}}>
                <Provider>
                    <Portal>
                        <Modal visible={visible} onDismiss={this._hideModal}>
                            <View>
                                <Surface style={surfaceStyles.surface}>
                                    <Button color={colors.foodblocksRed} icon='close' onPress={this._hideModal}></Button>
                                    <ScrollView showsHorizontalScrollIndicator={false}>
                                    <Title style={textStyles.title}>{data.title}</Title>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[textStyles.sub, {color:'grey'}]}>{data.source_name.toUpperCase()}</Text>
                                        <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}} compact={true}>MORE INFO</Button>
                                    </View>
                                    <Button mode='contained' contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed} onPress={() => this.onPress()}>Add foodblock</Button>
                                    <View>
                                        <Text style={[textStyles.sub, {textAlign:'center'}]}>Recipe by {data.author}</Text>
                                        <Text style={[textStyles.sub, {textAlign:'center', fontStyle: 'italic'}]}>{data.description}</Text>
                                        <Title style={textStyles.heading}>Ingredients Required</Title>
                                        <Text style={textStyles.body}>{data.ingredients}</Text>
                                        {(data.prepTime || data.cookTime || data.totalTime) &&
                                        <View style={{paddingVertical: 10}}>
                                            <Title style={textStyles.heading}>Time needed</Title>
                                            {data.prepTime && <Paragraph style={textStyles.body}>Prep
                                            Time: {moment.duration(data.prepTime).asMinutes()}M</Paragraph>}
                                            {data.cookTime && <Paragraph style={textStyles.body}>Cook
                                            Time: {moment.duration(data.cookTime).asMinutes()}M</Paragraph>}
                                            {data.totalTime && <Paragraph style={textStyles.body}>Total
                                            Time: {moment.duration(data.totalTime).asMinutes()}M</Paragraph>}
                                        </View>}
                                        <Title style={textStyles.heading}>Directions</Title>
                                        <Text style={textStyles.body}>{data.directions}</Text>
                                    </View>
                                    </ScrollView>
                                    
                                </Surface>
                            </View>
                    {/* <View style={{paddingVertical: 10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Title style={styles.subtitle}>Get started</Title>
                            <IconButton
                                color={this.state.pressed ? 'red' : 'black'}
                                icon={'star'}
                                onPress={() => this.onPress()}
                                size={30}
                            />
                        </View>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Author: {data.author}</Title>
                            <Paragraph>{data.description}</Paragraph>
                        </Surface>
                    </View>
                    <View style={{paddingVertical: 10}}>
                        <Title style={styles.subtitle}>Get started</Title>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Ingredients needed</Title>
                            {ingredients}
                        </Surface>
                    </View> */}
                    {/*<View style={{paddingVertical: 10}}>*/}
                    {/*    <Surface style={surfaceStyles.surface}>*/}
                    {/*        <Title style={{padding: 5, fontSize: 18}}>Tools needed</Title>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 1</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Tool 2</Paragraph>*/}
                    {/*        <Paragraph style={{padding: 5, fontSize: 12}}>Makan</Paragraph>*/}
                    {/*    </Surface>*/}
                    {/*</View>*/}
                    {/* {(data.prepTime || data.cookTime || data.totalTime) &&
                    <View style={{paddingVertical: 10}}>
                        <Surface style={surfaceStyles.surface}>
                            <Title style={{padding: 5, fontSize: 18}}>Time needed</Title>
                            {data.prepTime && <Paragraph style={{padding: 5, fontSize: 12}}>Prep
                                Time: {moment.duration(data.prepTime).asMinutes()}M</Paragraph>}
                            {data.cookTime && <Paragraph style={{padding: 5, fontSize: 12}}>Cook
                                Time: {moment.duration(data.cookTime).asMinutes()}M</Paragraph>}
                            {data.totalTime && <Paragraph style={{padding: 5, fontSize: 12}}>Total
                                Time: {moment.duration(data.totalTime).asMinutes()}M</Paragraph>}
                        </Surface>
                    </View>}
                    <View>
                        <Title style={[styles.subtitle, {paddingVertical: 10}]}>Steps</Title>
                        <View style={{paddingVertical: 10}}>
                            <Surface style={surfaceStyles.surface}>
                                {directions}
                            </Surface>
                        </View>
                    </View>
                    <View>
                        <Caption>
                            Source: {data.source}
                        </Caption>
                    </View> */}
                        </Modal>
                    </Portal>
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <Card style={{height: 300}}>
                        <Image style={{flex: 1, resizeMode: 'cover'}} source={{uri: data.img}}/>
                    </Card>
                    <Title style={textStyles.title}>{data.title}</Title>
                    <View style={{flexDirection:'row'}}>
                        <Text style={[textStyles.sub, {color:'grey'}]}>{data.source_name.toUpperCase()}</Text>
                        <Button color={colors.foodblocksRed} style={{color: colors.foodblocksRed}} compact={true}>MORE INFO</Button>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 60, paddingTop:5}}>
                        <View style={circleStyle.circle}>
                            <Text style={textStyles.circleText}>{data.totalTime}</Text>
                        </View>
                        <View style={circleStyle.circle}>
                            
                        </View>
                        <View style={circleStyle.circle}>
                            
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 60, paddingTop:5}}>
                        <Text style={[textStyles.circleText, {color:'black'}]}>Minutes</Text>
                        <Text style={[textStyles.circleText, {color:'black'}]}>Ingredients</Text>
                        <Text style={[textStyles.circleText, {color:'black'}]}>Calories</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop:15}}>
                        <Button mode='contained' contentStyle={{paddingVertical: 10}} color={colors.green} onPress={() => this._showModal()}>Get Started</Button>
                        <Button mode='contained' contentStyle={{paddingVertical: 10}} color={colors.foodblocksRed} onPress={() => this.onPress()}>Add foodblock</Button>
                    </View>
                </View>
                </Provider>
            </SafeView>
        )
    }
})

const surfaceStyles = StyleSheet.create({
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
});

const textStyles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontFamily: 'montserrat',
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        paddingTop: 20,
        paddingHorizontal: 20,
        fontFamily: 'montserrat'
    },
    sub: {
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
    },
})

const circleStyle = StyleSheet.create({
    circle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: colors.foodblocksRed,
        fontSize: 16,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
})