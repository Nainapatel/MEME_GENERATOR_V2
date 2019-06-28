
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions, View, BackHandler, Animated ,TouchableOpacity} from 'react-native';


let {width, height} = Dimensions.get('window');

export default class Second extends React.Component {


    componentDidMount(){
        console.log("hiii second component")
    }
    
  render() {

   return(
       <View>
           <Text>
               Second
           </Text>
       </View>
   )
  }
}




