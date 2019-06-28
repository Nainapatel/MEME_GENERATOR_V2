
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
  import RNFS from 'react-native-fs';

export default class SplashScreen extends React.Component {


  // componentDidMount() {
  //   const { currentFolder,Myapp } = this.props;

  //   const currentDirectory = Myapp
  //   const absolutePath = `/storage/emulated/0/MyApp/emoji`
    
  //   console.log("----------------------------",absolutePath)

  //   RNFS.mkdir(absolutePath)
  //   .then((result) => { 
  //   })
  //   .catch((err) => {
  //     console.warn('err', err)
  //   })
  // }
  render() {
    return (

      <View style={styles.container}>

      <Text style={styles.text}> MEME Generator </Text>

      <Image style={styles.img} source={require('../assets/logo.png')}/>

      </View>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e7e7e7',
  },
  img:{
    height: 170,
    width: 170,
     borderRadius: 8,
    borderWidth: 0.5,
    
  },
  text:{
    fontSize: 30,
    fontWeight: 'bold',
    color:'#000',
    marginBottom:20
  }

});


