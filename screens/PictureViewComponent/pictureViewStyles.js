import { StyleSheet } from 'react-native';
import {
    Dimensions,
    Platform
  } from "react-native";
const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;
export default StyleSheet.create({
    container: {
        flex: 1
      },
      image: {
        flex: 1
      },
      toolBar: {
        position: "absolute",
        top: 0,
        right: 0,
        paddingTop: 15,
        width: 60,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
      },
      saveIcon: {
        position: "absolute",
        top: 0,
        right: 45,
        paddingTop: 15,
        width: 60,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
      },
      cameraIcon: {
        position: "absolute",
        top: 0,
        right: 85,
        paddingTop: 15,
        width: 60,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
      },
      emojiIcon: {
        position: "absolute",
        top: 0,
        right: 125,
        paddingTop: 15,
        width: 60,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
      },
      stickershop: {
        position: "absolute",
        top: 0,
        right: 165,
        paddingTop: 15,
        width: 60,
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1
      },
      // stickershop1: {
      //   position: "absolute",
      //   top: 0,
      //   right: 175,
      //   paddingTop: 15,
      //   width: 60,
      //   justifyContent: "space-between",
      //   alignItems: "center",
      //   zIndex: 1
      // },
      iconButton: {
        height: 50,
        width: 50
      },
      floatingTopLeftButton: {
        position: "absolute",
        top: 0,
        left: 45,
        paddingLeft: 15,
        paddingTop: 15,
        zIndex: 1
      },
      floatingTopLeftButton1: {
        position: "absolute",
        top: 0,
        left: 0,
        paddingLeft: 15,
        paddingTop: 15,
        zIndex: 1
      },
      floatingBottomRightButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        paddingRight: 15,
        paddingBottom: 15,
        zIndex: 1
      },
      captionEditor: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        zIndex: 1
      },
      preview: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        width: WIDTH,
        height: 400,
        flex: 1
      },
      bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
      },
      header:{
        backgroundColor: "#ffffff",
        height: Platform.OS === "android" ? 55 : 65
      },
    })