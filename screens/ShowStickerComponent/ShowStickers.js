import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ActivityIndicator
} from "react-native";
import Config from "../../config";
import axios from "axios";
let config = new Config();
import RNFS from "react-native-fs";
import RNFetchBlob from "rn-fetch-blob";
import Toast from "react-native-simple-toast";
import styles from './showStickersStyles'

export default class ShowStickers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stickers: [],
      resDownloadedData: [],
      error: [],
      show: false,
      animating: false ,
      firstImg: []
    };
  }
  // in  componentDidMount call stickers api 
  componentDidMount() {
    console.log(
      "=======================",
      this.props.navigation.state.params.data
    );

    axios
      .get(
        config.getBaseUrl() +
          "stickers/" +
          this.props.navigation.state.params.data
      )
      .then(res => {
        let arra = [];
        

        for (let i = 0; i < res.data.result.stickers.length; i++) {
          arra.push(res.data.result.stickers[i].split("/images/").reverse()[0]);
        }
        this.setState({firstImg:res.data.result.stickers[0].split("/images/").reverse()[0]})
        this.setState({
          stickers: arra
        });
        this.setState({ animating: true });
      });
  }
// show download and remove button 
  showButtons() {
    return (
      <View>
        {this.readDir()}

        {this.state.show ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#e7e7e7",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              padding: 5
            }}
            onPress={() => this.remove()}
          >
            <Text style={{ color: "black", textAlign: "center" }}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#e7e7e7",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#fff",
              padding: 5
            }}
            onPress={() => this.download()}
          >
            <Text style={{ color: "black", textAlign: "center" }}>
              Download
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  // read dir of device
  readDir() {
    let dirs =
      `/storage/emulated/0/MEME_Generator/` +
      this.props.navigation.state.params.data;

    RNFS.readDir(dirs)
      .then(allImages => {
        this.setState({ show: true });
      })
      .catch(err => {
        this.setState({ error: err.code });
      });
  }
// make Directory in device when click download button
  download() {
    const absolutePath =
      `/storage/emulated/0/MEME_Generator/` +
      this.props.navigation.state.params.data;

    RNFS.mkdir(absolutePath)
      .then(result => {
        this.downloadFile();
      })
      .catch(err => {
        console.warn("err", err);
      });
  }
// permission for download 
  async downloadFile() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
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
// download stickers in  one particular folder in device
  actualDownload = () => {
    let dirs =
      `/storage/emulated/0/MEME_Generator/` +
      this.props.navigation.state.params.data;

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
          this.setState({ resDownloadedData: res.data });
        });
    }
    Toast.show("Downloaded...");
  };
// on click remove button remove folder from device 
  remove() {
    let dirs =
      `/storage/emulated/0/MEME_Generator/` +
      this.props.navigation.state.params.data;

    RNFetchBlob.fs
      .unlink(dirs)
      .then(() => {
        console.log("file is deleted");
        this.setState({ show: false });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    const animating = this.state.animating;
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
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "column",
                flex: 6,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                 source={{ uri: config.getMediaUrl() + this.state.firstImg }}
                style={styles.iconButton}
              />
            </View>
            <View style={{ flexDirection: "column", flex: 6 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "black"
                }}
              >
                {this.props.navigation.state.params.data}
              </Text>
  
              {this.showButtons()}
            </View>
          </View>
  
          <View>
            <FlatList
              data={this.state.stickers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.GridViewContainer}>
                  <Image
                    source={{ uri: config.getMediaUrl() + item }}
                    style={styles.image}
                  />
                </View>
              )}
              numColumns={5}
            />
          </View>
  
          <View />
        </View>
      );
    }
   
  }
}
