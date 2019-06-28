
import React, {Component} from 'react';
import {Platform, Image, Text,Dimensions, View, BackHandler, Animated ,TouchableOpacity} from 'react-native';

import styles from './saveimgStyles';



let {width, height} = Dimensions.get('window');

export default class ShowSavedImg extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            image: "",
        }
      }
componentDidMount(){
    this.setState({image: this.props.navigation.state.params.image})
}

  render() {
    const { navigation } = this.props;
    console.log("navigation------------------",this.props)
   return(
       <View>
           <TouchableOpacity  onPress={() => navigation.navigate("PictureView",{savedImage:this.state.image})}>
                  <Image
                  source={ this.state.image ? { uri :  this.state.image } : null}
                    // source={{ uri: this.state.image }}
                    style={styles.selectImage}
                  />
                  </TouchableOpacity>
       </View>
   )
  }
}


