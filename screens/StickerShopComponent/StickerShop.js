import React, { Component } from "react";
import { View, Text, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Config from "../../config";
import axios from "axios";
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
let config = new Config();
import styles from "./stickershopStyles";
import MenuButton from "../../components/MenuButton";
import { Header } from "native-base";

export default class StickerShop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryName: [],
      stickers: [],
      show: false,
      animating: false 
    };
  } 
// in componentDidMount get categoryname and add key alreadyDownloaded or not
  componentDidMount() {
    axios.get(config.getBaseUrl() + "category").then(async res => {
      const categoryData = res.data.result.category;

      for (let i = 0; i < categoryData.length; i++) {
        let dirs = `/storage/emulated/0/MEME_Generator/${categoryData[i].name}`;
        await RNFS.readDir(dirs)
          .then(allDownloadedCategory => {
            categoryData[i]["alreadyDownloaded"] = true;
            
          })
          .catch(err => {
            categoryData[i]["alreadyDownloaded"] = false;
         
          });
      }
     
      this.setState({ categoryName: categoryData });
      this.setState({ animating: true });
      
      console.log("----names=====", this.state.categoryName);
    });
  }
// on click download call api for get name of stickers
  download(data) {
    console.log("data name-----", data);

    axios.get(config.getBaseUrl() + "stickers/" + data).then(res => {
      let arra = [];

      for (let i = 0; i < res.data.result.stickers.length; i++) {
        arra.push(res.data.result.stickers[i].split("/images/").reverse()[0]);
      }
      this.setState({
        stickers: arra
      });
      this.mkdirectory(data);
    });
  }
  // make directory in device 
  mkdirectory(data) {
    const absolutePath = `/storage/emulated/0/MEME_Generator/` + data;

    RNFS.mkdir(absolutePath)
      .then(result => {
        this.downloadFile(data);
      })
      .catch(err => {
        console.warn("err", err);
      });
  }
// permission for download file
  async downloadFile(data) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(data);
      } else {
        Alert.alert(
          "Permission Denied!",
          "You need to give storage permission to download the file"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
// download stickers in folder in device
  actualDownload = data => {
    let dirs = `/storage/emulated/0/MEME_Generator/` + data;
    console.log("dir----------------", dirs);

    for (let i = 0; i < this.state.stickers.length; i++) {
      let name = this.state.stickers[i].split("/")[1];
      let stickerName = config.getMediaUrl() + this.state.stickers[i];

      RNFetchBlob.config({
        path: dirs + "/" + name,
        fileCache: true
      })
        .fetch("GET", stickerName, {})
        .then(res => {
          console.log("res.data============================", res.data);

          const existingCategories = this.state.categoryName;

          for(let i = 0; i < existingCategories.length; i++) {
            if (existingCategories[i].name === data) {
              existingCategories[i].alreadyDownloaded = true;
            }
          }
  
          this.setState({
            categoryName: existingCategories
          });
          
        })
    }
  };
/** @param {*} data: category name and on click remove particular category */
  remove(data) {
    let dirs = `/storage/emulated/0/MEME_Generator/` + data;

    RNFetchBlob.fs
      .unlink(dirs)
      .then(() => {
        console.log("file is deleted");
        const existingCategories = this.state.categoryName;

        for(let i = 0; i < existingCategories.length; i++) {
          if (existingCategories[i].name === data) {
            existingCategories[i].alreadyDownloaded = false;
          }
        }

        this.setState({
          categoryName: existingCategories
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }
/** @param {*} data : name of downloaded categoty and show download and remove buttons */
  showButtons(data) {
    if (data.alreadyDownloaded == true) {
      return (
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TouchableOpacity
            className="iconButton"
            onPress={() => this.remove(data.name)}
          >
            <Icon name={"delete"} size={25} color="#606060" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TouchableOpacity
            className="iconButton"
            onPress={() => this.download(data.name)}
          >
            <Icon name={"arrow-collapse-down"} size={25} color="#606060" />
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
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
    }else{
      return (
        <View>
           <Header style={styles.header}>
          <MenuButton navigation={this.props.navigation} />
          <View style={styles.title}>
            <Text style={styles.text1}> Sticker Shop </Text>
          </View>
        </Header>
          {this.state.categoryName.map(data => (
            <View>
              <TouchableOpacity
          
                style={styles.card}
                onPress={() =>
                  navigation.navigate("ShowStickers", { data: data.name })
                }
              >
                <View style={{ flexDirection: "column", flex: 6 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      teztAlign: "center",
                      color: "black"
                    }}
                  >
                    {data.name}
                  </Text>
                </View>
  
                <View style={{ flexDirection: "column", flex: 3 }} />
  
                {this.showButtons(data)}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }
   
  }
}
