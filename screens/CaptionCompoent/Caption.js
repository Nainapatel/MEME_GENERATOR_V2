import React, { Component } from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  PanResponder,
  Animated,
  Image
} from "react-native";
import PropTypes from "prop-types";
const HEIGHT = Dimensions.get("window").height;


export const COLORS = [
  "#ffffff",
  "#000000",
  "#ffee58",
  "#4db6ac",
  "#42a5f5",
  "#ab47bc",
  "#f44336"
];
export const FADEDBLACK = "rgba(0,0,0,.51)";
export const FADEDWHITE = "rgba(255,255,255,.51)";
import styles from './captionStyles';
export class Caption extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPanY: 0,
      captionArray: [],
      existingIndex: 0,
      panArray: [],
      panArrayImage: [],
      panArraySticker: [],
      imageArray: [],
      stickerArray: []
    };
  }
  /**@param {*} index: index wise moving text  */
  getPanResponder(index) {
    console.log("call ", index);
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArray[index].x,
          dy: this.state.panArray[index].y
        }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArray[index];

        selectedPanArray.setOffset({
          x: this.state.panArray[index].x._value,
          y: this.state.panArray[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArray[index].x._value,
          y: this.state.panArray[index].y._value
        });

        const existingPanArray = this.state.panArray;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArray: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArray[index].flattenOffset();
      }
    });
  }
  /**@param {*} index: index wise moving bitmoji sticker  */
  getPanResponderImage(index) {
    console.log("call ", index);
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArrayImage[index].x,
          dy: this.state.panArrayImage[index].y
        }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArrayImage[index];
        selectedPanArray.setOffset({
          x: this.state.panArrayImage[index].x._value,
          y: this.state.panArrayImage[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArrayImage[index].x._value,
          y: this.state.panArrayImage[index].y._value
        });

        const existingPanArray = this.state.panArrayImage;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArrayImage: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArrayImage[index].flattenOffset();
      }
    });
  }
  /**@param {*} index: index wise moving  emoji  */
  getPanResponderSticker(index) {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.panArraySticker[index].x,
          dy: this.state.panArraySticker[index].y
        }
      ]),
      onPanResponderGrant: (e, gestureState) => {
        const selectedPanArray = this.state.panArraySticker[index];
        selectedPanArray.setOffset({
          x: this.state.panArraySticker[index].x._value,
          y: this.state.panArraySticker[index].y._value
        });
        selectedPanArray.setValue({
          x: this.state.panArraySticker[index].x._value,
          y: this.state.panArraySticker[index].y._value
        });

        const existingPanArray = this.state.panArraySticker;

        existingPanArray[index] = selectedPanArray;

        this.setState({
          panArraySticker: existingPanArray
        });
      },

      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.panArraySticker[index].flattenOffset();
      }
    });
  }
  /**@param {*} props :  props from picture screen 
   * get in props: image, loopCount, style, lock, visible, text, color, onPress, existingIndex, sticker, offset */
  componentWillReceiveProps(props) {
    console.log("props value====caption==============", props);

    let data = [];
    let stickerBitmoji = [];
    let stickerAndEmoji = [];

    const existingPanArray = this.state.panArray;
    const existingPanArrayImage = this.state.panArrayImage;
    const existingPanArraySticker = this.state.panArraySticker;
// setState text and color
    for (let i = 0; i < props.text.length; i++) {
      if (props.text[i] != "") {
        data.push({
          text: props.text[i],
          color: props.color[i]
        });
        existingPanArray.push(
          new Animated.ValueXY({ x: 0, y: this.props.offset })
        );
      }
    }
// setState bitmoji stickers
    for (let i = 0; i < props.image.length; i++) {
      stickerBitmoji.push({
        image: props.image[i]
      });
      existingPanArrayImage.push(
        new Animated.ValueXY({ x: 0, y: this.props.offset })
      );
    }
// setState Emoji
    for (let i = 0; i < props.sticker.length; i++) {
      stickerAndEmoji.push({
        sticker: props.sticker[i]
      });
      existingPanArraySticker.push(
        new Animated.ValueXY({ x: 0, y: this.props.offset })
      );
    }

    this.setState({ captionArray: data, panArray: existingPanArray });
    this.setState({
      imageArray: stickerBitmoji,
      panArrayImage: existingPanArrayImage
    });
    this.setState({
      stickerArray: stickerAndEmoji,
      panArraySticker: existingPanArraySticker
    });
    console.log("this.=============================", this.state.stickerArray);
  }
  /** @param {*} index : index wise call function  */
  onclickFunction(index) {
    this.props.onPress(index);
  }

  render() {
    console.log("call render in caption");
    var bg = this.props.color == "#000000" ? FADEDWHITE : FADEDBLACK;
    if (this.props.visible) {
      return (
        <View>
          {this.state.captionArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <Animated.View
                key={index}
                {...(this.props.lock
                  ? null
                  : this.getPanResponder(index).panHandlers)}
                style={[
                  this.props.style,
                  styles.container,
                  {
                    transform: [
                      { translateX: this.state.panArray[index].x },
                      { translateY: this.state.panArray[index].y }
                    ]
                  }
                ]}
              >
                <TouchableWithoutFeedback
                  onPress={() => this.onclickFunction(index)}
                >
                  <Text
                    style={[
                      styles.text,
                      { backgroundColor: bg, color: data.color }
                    ]}
                  >
                    {data.text}
                  </Text>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          ))}

          {this.state.imageArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <Animated.View
                key={index}
                {...(this.props.lock
                  ? null
                  : this.getPanResponderImage(index).panHandlers)}
                style={[
                  this.props.style,
                  styles.container,
                  {
                    transform: [
                      { translateX: this.state.panArrayImage[index].x },
                      { translateY: this.state.panArrayImage[index].y }
                    ]
                  }
                ]}
              >
                <TouchableWithoutFeedback>
                  <Image source={{ uri: data.image }} style={styles.preview} />
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          ))}
          {this.state.stickerArray.map((data, index) => (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute"
              }}
            >
              <Animated.View
                key={index}
                {...(this.props.lock
                  ? null
                  : this.getPanResponderSticker(index).panHandlers)}
                style={[
                  this.props.style,
                  styles.container,
                  {
                    transform: [
                      { translateX: this.state.panArraySticker[index].x },
                      { translateY: this.state.panArraySticker[index].y }
                    ]
                  }
                ]}
              >
                <TouchableWithoutFeedback>
                  <Image source={{uri:'file://' + data.sticker}} style={styles.preview} />
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
          ))}
        </View>
      );
    } else {
      return null;
    }
  }
  
}

Caption.propTypes = {
  onPress: PropTypes.func,
  color: PropTypes.string,
  text: PropTypes.string,
  lock: PropTypes.bool,
  offset: PropTypes.number,
  visible: PropTypes.bool
};

Caption.defaultProps = {
  text: "",
  lock: true,
  offset: HEIGHT / 2,
  visible: true,
  onPress: () => {}
};

