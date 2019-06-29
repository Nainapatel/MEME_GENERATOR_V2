import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Header } from "native-base";
import Picker from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MenuButton from "../../components/MenuButton";
const HEIGHT = Dimensions.get("screen").height;
import styles from "./addImageStyles";
export default class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      show: false
    };
    this.state = { animating: false };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.text1}> MEME Generator </Text>
          </View>
        </Header>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                height: HEIGHT/3,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <Icon
                name="image-plus"
                color="#606060"
                size={80}
                style={styles.icon}
                onPress={() => this._pickImage("image")}
              />
            </View>
            <View
              style={{
                height: HEIGHT/3,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Icon
                name="folder-multiple-image"
                color="#606060"
                size={80}
                style={styles.icon}
                onPress={() => navigation.navigate("SavedImage")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  //image picker
  _pickImage = type => {
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
        this.props.navigation.navigate("PictureView", { image: response.uri });
        this.setState({ name: response.fileName, image: uri, animating: true });
      }
    });
  };
}
