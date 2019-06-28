
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions, View, BackHandler, Animated ,TouchableOpacity} from 'react-native';



let {width, height} = Dimensions.get('window');

export default class First extends React.Component {

componentDidMount(){
    console.log("hiii first component")
}

  render() {

   return(
       <View>
           <Text>
               First
           </Text>
       </View>
   )
  }
}




