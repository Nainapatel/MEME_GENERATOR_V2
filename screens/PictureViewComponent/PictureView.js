import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  Animated
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import Editimg from "../EditimgComponent/Editimg";
import { Caption } from "../CaptionCompoent/Caption";
import { captureScreen } from "react-native-view-shot";
import RNFetchBlob from "rn-fetch-blob";
import RNFS from "react-native-fs";
import AwesomeAlert from "react-native-awesome-alerts";
import ImagePicker from "react-native-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";
import AddedStickers from "../addedStickerComponent/AddedStickers";
import First from "../addedStickerComponent/first";
import styles from "./pictureViewStyles";

class PictureView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cEditorEnabled: false,
      text: [],
      color: [],
      image: undefined,
      images: "",
      savedImage: "",
      loopCount: 0,
      screenshortImage: "",
      status: true,
      statusButton: true,
      existingIndex: 0,
      showAlert: false,
      stickers: [],
      animation: new Animated.Value(0),
      stickersName: []
    };
    this.child = React.createRef();
    this.caption = null;
    this.finishEditingCaption = this.finishEditingCaption.bind(this);
    this.stickersandemoji = this.stickersandemoji.bind(this);
    this.closeRBSheet = this.closeRBSheet.bind(this);
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };
  /** on click cancle edited text and color removed */ 
  onCancel() {
    this.setState({
      text: [],
      color: [],
      stickers:[],
      stickersName:[]
    });
    this.closeCaptionEditor();
    this.props.onCancel();
  }
  // on click text open caption editor
  openCaptionEditor() {
    this.setState({
      cEditorEnabled: true,
      loopCount: this.state.loopCount + 1
    });
    this.child.current.addTextInput(this.state.loopCount);
  }
  // for edit text
  openCaptionEditorOnPress() {
    this.setState({ cEditorEnabled: true });
  }
  // close caption editor
  closeCaptionEditor() {
    this.setState({ cEditorEnabled: false });
  }
  /** @param {*} text color and existingIndex : onFinish text pass in caption screen */

  finishEditingCaption(text, color, existingIndex) {
    this.closeCaptionEditor();

    let NewValue = text;
    let NewColor = color;

    this.setState({ text: NewValue });
    this.setState({ color: NewColor });
    this.setState({ existingIndex: existingIndex });
  }
  // setState image from Add image screen
  // get image in paramas
  componentDidMount() {
    this.setState({ images: this.props.navigation.state.params.image });
    this.setState({
      savedImage: this.props.navigation.state.params.savedImage
    });
    console.log(
      "------------------img================",
      this.props.navigation.state.params.savedImage
    );
  }
  // snapshot of screen and download image in device
  snapshot() {
    this.setState({ status: false });
    this.setState({ statusButton: false });
    setTimeout(() => {
      captureScreen({
        format: "jpg",
        quality: 0.8
      })
        .then(uri => {
          this.setState({ screenshortImage: uri });
          this.downloadFile(uri);
        })
        .catch(err => {
          console.error("Oops, snapshot failed", error);
        });
    }, 1000);
  }

/** @param {*} uri : uri is path of snapshot image and pass from snapshot function  */
  async downloadFile(uri) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "App needs access to memory to download the file"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(uri);
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
  // download snapshort in device
  actualDownload = uri => {
    console.log(this.state.screenshortImage);
    let name = uri.split("/")[8];
    let url = uri;
    let dirs = RNFetchBlob.fs.dirs.PictureDir;
    const file_path = dirs + "/" + name;

    console.log("----------------------------", this.state.screenshortImage);
    RNFS.readFile(this.state.screenshortImage, "base64").then(res => {
      this.setState({ resBase64: res });
      let base64 = this.state.resBase64;
      RNFS.writeFile(file_path, base64, "base64");
      this.setState({ showAlert: true });
      // alert("Your file has been downloaded to Pictures folder!")
      this.setState({ statusButton: true });
      this.setState({ status: true }).catch(error => {
        console.log("err", error);
        alert(JSON.stringify(error));
      });
    });
  };

  stickers(uri) {
    let stickers = this.state.stickers;
    stickers.push(uri);
    console.log("call stickres in picture=", this.state.stickers);
  }
/** @param {*} item: on click Emoji and show added stickers */

  stickersandemoji(item) {
    console.log("------------------item-----------", item);
    this.RBSheet.close();

    let existinSticker = this.state.stickersName;
    existinSticker.push(item);

    this.setState({ stickersName: existinSticker });
    console.log(
      "in picture screen=============================",
      this.state.stickersName
    );
  }
  closeRBSheet(){
    this.RBSheet.close();
  }
  render() {
    
    const { showAlert } = this.state;
    const { navigation } = this.props;
    if (this.state.images || this.state.savedImage) {
      return (
        <View style={this.props.style}>
          <View>
            {this.state.statusButton ? (
              <View>
                <TouchableOpacity
                  style={[styles.iconButton, styles.floatingTopLeftButton]}
                  onPress={this.onCancel.bind(this)}
                >
                  <Icon name={"close"} size={34} color="#606060" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.iconButton, styles.floatingTopLeftButton1]}
                  onPress={() => navigation.navigate("AddImage")}
                >
                  <Icon name={"arrow-left"} size={34} color="#606060" />
                </TouchableOpacity>

                <View style={styles.toolBar}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={this.openCaptionEditor.bind(this)}
                  >
                    <Icon name={"format-text"} size={34} color="#606060" />
                  </TouchableOpacity>
                </View>

                <View style={styles.saveIcon}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={this.snapshot.bind(this)}
                  >
                    <Icon
                      name={"arrow-down-bold-circle"}
                      size={34}
                      color="#606060"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.cameraIcon}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => this._pickImage("image")}
                  >
                    <Icon name={"camera"} size={34} color="#606060" />
                  </TouchableOpacity>
                </View>

                <View style={styles.emojiIcon}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => this.RBSheet.open()}
                  >
                    <Icon
                      name={"emoticon-happy-outline"}
                      size={34}
                      color="#606060"
                    />
                  </TouchableOpacity>
                </View>

                <RBSheet
                  ref={ref => {
                    this.RBSheet = ref;
                  }}
                  height={350}
                  duration={250}
                  closeOnDragDown={false}
                  customStyles={{
                    container: {
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  }}
                >
                  <AddedStickers
                   close ={this.closeRBSheet.bind(this)}
                    propsValue={this.props}
                    propsfunction={this.stickersandemoji.bind(this)}
                  />
                </RBSheet>

                <View style={styles.stickershop}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate("StickerShop")}
                  >
                    <Icon name={"shopping"} size={34} color="#606060" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>

          <Editimg
            ref={this.child}
            onCancel={this.closeCaptionEditor.bind(this)}
            image={this.state.image}
            onFinish={this.finishEditingCaption}
            enabled={this.state.cEditorEnabled}
            loopCount={this.state.loopCount}
            style={styles.captionEditor}
          />
          <Caption
            ref={ref => {
              this.caption = ref;
            }}
            image={this.state.stickers}
            loopCount={this.state.loopCount}
            style={{ zIndex: 1 }}
            lock={false}
            visible={!this.state.cEditorEnabled}
            text={this.state.text}
            color={this.state.color}
            onPress={this.openCaptionEditorOnPress.bind(this)}
            existingIndex={this.state.existingIndex}
            sticker={this.state.stickersName}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff"
            }}
          >
            {this.state.images ? (
              <Image
                source={{ uri: this.state.images }}
                style={styles.preview}
              />
            ) : (
              <Image
                source={{ uri: this.state.savedImage }}
                style={styles.preview}
              />
            )}
          </View>

          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Successfully saved!"
            message="Your file has been downloaded to Pictures folder!"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Yes"
            confirmButtonColor="#DD6B55"
            style={{ zIndex: 1 }}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
        </View>
      );
    } else {
      return null;
    }
  }
  _pickImage = type => {
    this.setState({ show: true });

    console.log("function call", this.props.navigation.state.params.projectId);
    const options = {
      allowsEditing: true,
      base64: false
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const uri = response.uri;
        this.setState({ image: uri });
        this.stickers(uri);
        this.setState({ animating: true });
      }
    });
  };
}

PictureView.propTypes = {
  style: PropTypes.obj,
  path: PropTypes.string,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onSubmit: PropTypes.func
};

PictureView.defaultProps = {
  style: styles.container,
  path: null,
  onCancel: () => {},
  onSave: () => {},
  onSubmit: () => {}
};

export default PictureView;