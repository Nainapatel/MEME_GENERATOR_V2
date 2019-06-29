import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";import RNFetchBlob from "rn-fetch-blob";

import { Header } from "native-base";

import RNFS from "react-native-fs";
import MenuButton from "../../components/MenuButton";

import styles from './saveimgStyles';

export default class SavedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      selectedImage: undefined,
      animating: false
    };
  }
// in componentDidMount  read device's dir. 
  componentDidMount = async () => {
    let dirs = RNFetchBlob.fs.dirs.PictureDir;
    console.log("--path--", dirs);
    console.log("filepath in get image screen", dirs);
    RNFS.readDir(dirs)
      .then(allImages => {
        console.log("allImages", allImages);
        this.setState({ image: allImages });
        this.setState({ animating: true });
      })
      .catch(err => {
        console.log("err", err);
        console.log(err.message, err.code);
      });
  };


  render() {
    const animating = this.state.animating;
    const { navigation } = this.props;
    if (!animating) {
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={animating}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    } else {
      return (
       
          <View>
             <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.text1}> Sticker Shop </Text>
          </View>
        </Header>
            <FlatList
              data={this.state.image}
              renderItem={({ item }) => (
                <View style={styles.GridViewContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ShowSavedImg",{image:"file://" + item.path })
                    }}
                  >
                    <Image
                      source={{ uri: "file://" + item.path }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
              )}
              numColumns={2}
            />
          </View>
          
      
      );
    }
  }
}

