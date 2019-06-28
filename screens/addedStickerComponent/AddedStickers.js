import React, { Component } from "react";
import { FlatList, View, Image, TouchableOpacity, Text } from "react-native";
import RNFS from "react-native-fs";
import styles from "./addedStickerstyles";
import Config from "../../config";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-simple-toast";

let config = new Config();

export default class AddedStickers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Emoji: [],
      show: false,
      categoryName: []
    };
  }
  /** read directory of device and fetch downloaded emoji */
  async componentDidMount() {
    let dirs = `/storage/emulated/0/MEME_Generator/`;
    await RNFS.readDir(dirs)
      .then(async allFolderName => {
        console.log("index 0============", allFolderName[0].name);

        let dirs =
          "/storage/emulated/0/MEME_Generator/" + allFolderName[0].name;

        RNFS.readDir(dirs)
          .then(allImages => {
            this.setState({ Emoji: allImages });
            this.setState({ show: true });
          })
          .catch(err => {
            console.log(err);
          });
        let data = [];
        for (let i = 0; i < allFolderName.length; i++) {
          let dirs =
            "/storage/emulated/0/MEME_Generator/" + allFolderName[i].name;
          await RNFS.readDir(dirs).then(allFiles => {
            data.push({
              path: allFiles[0].path.split("/MEME_Generator/")[1],
              name: allFolderName[i].name
            });
          });
        }

        this.setState({ categoryName: data });
      })
      .catch(err => {});
  }
  //  Show tabs in bottom

  showTabs() {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        {this.state.categoryName.map(data => (
          <TouchableOpacity onPress={() => this.emoji(data.name)}>
            <View style={{ width: 50, height: 50 }}>
              <Image
                source={{ uri: config.getMediaUrl() + data.path }}
                style={{ width: 30, height: 30, elevation: 5 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
 /**  @param {*} data: name of category and category wise read directory  */
  emoji(data) {
    console.log("call emoji", data);

    let dirs = "/storage/emulated/0/MEME_Generator/" + data;

    RNFS.readDir(dirs)
      .then(allImages => {
        this.setState({ Emoji: allImages });
        this.setState({ show: true });
      })
      .catch(err => {
        this.setState({ error: err.code });
        Toast.show(" Folder does not exist");
      });
  }
  render() {
    const { navigation } = this.props.propsValue;

    return (
      <>
        {this.state.show ? (
          <>
            <View>
              <ScrollView>
                <FlatList
                  data={this.state.Emoji}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.GridViewContainer}>
                      <TouchableOpacity
                        onPress={() => this.props.propsfunction(item.path)}
                      >
                        <Image
                          source={{ uri: "file://" + item.path }}
                          style={styles.image}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  numColumns={8}
                />
              </ScrollView>
            </View>
            <View style={styles.MainContainer}>
              <View style={styles.bottomView}>{this.showTabs()}</View>
            </View>
          </>
        ) : (
          <View>
            <Text>Please Download stickers</Text>
            <TouchableOpacity 
              onPress={() => {navigation.navigate('StickerShop'),this.props.close()}}
            >
              <Text>Click here</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}
