
import React, {Component} from 'react';
import {Platform, Image, Text,Dimensions, View, BackHandler, Animated ,TouchableOpacity} from 'react-native';
import { Header } from "native-base";
import styles from './aboutStyles'
import MenuButton from "../components/MenuButton";


export default class About extends React.Component {

componentDidMount(){
    console.log("hiii first component")
}

  render() {

   return(
       <View>
            <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.text1}> About us </Text>
          </View>
        </Header>

        <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image style={styles.img} source={require('../assets/logo.png')}/>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:40,fontWeight:'bold',textAlign:'center'}}>
                MEME Generator
            </Text>
        </View>
       </View>
   )
  }
}




