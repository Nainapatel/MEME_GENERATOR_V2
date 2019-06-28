import React, { Component } from "react";
import {

  Text,
  View,
  Image,

  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Header } from "native-base";
import Picker from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-simple-toast";

import styles from './addImageStyles';
export default class AddImage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image : undefined,
      show : false
    };
    this.state = { animating: false };
  }

//for loader
  loaderFunction() {
    const animating = this.state.animating;
    const { navigation } = this.props;

    if (!animating) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating = { animating } 
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    } else {
      return this.state.show ? (
        <View>
          <TouchableOpacity
            style={styles.viewImg}
          >
            <Image source = {{ uri: this.state.image }} style = { styles.preview } />
          </TouchableOpacity>
        </View>
      ) : null;
    }
  }
  
  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          style = { styles.header }
        >
          <View style = { styles.title }>
            <Text style = { styles.text1 } > MEME Generator </Text>
          </View>
          <View style = {{ flex: 1, flexDirection: "column" }} />
          <View style = {{ flex: 2, flexDirection: "column" }}>
            <Icon
              name="add-a-photo"
              color="#606060"
              size={30}
              style={styles.icon}
              onPress={() => this._pickImage("image")}
            />
          </View>

          <View style={{ flex: 2, flexDirection: "column" }}>
            <Icon
              name="insert-photo"
              color="#606060"
              size={30}
              style={styles.icon}
              onPress={() => navigation.navigate("SavedImage")}
            />
          </View>
        </Header>
        {this.loaderFunction()}
      </View>
    );
  }
  //image picker
  _pickImage = type  =>{
    this.setState({ show: true });
    let options = {
      title: "MEME Generator",
      takePhotoButtonTitle: "Camera",
      chooseFromLibraryButtonTitle: "Gallery",
      cancelButtonTitle: "cancel",
      quality: 0.5,
      mediaType: "photo",
      maxWidth: 2000,
      noData: true,
      maxHeight: 2000,
      dateFormat: "yyyy-MM-dd HH:mm:ss",
      allowsEditing: false
    };
    Picker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePickerManager Error: ", response.error);
      } else if (response.customButton) {
      } else {
        const uri = response.uri;
        this.props.navigation.navigate('PictureView',  { image : response.uri })
        this.setState({ name: response.fileName,  image: uri, animating: true });

      }
    })
  };
}