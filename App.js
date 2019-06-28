
import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions, View, BackHandler, Animated ,TouchableOpacity} from 'react-native';
import Routes from './screens/Routes';
import Editimg from './screens/EditimgComponent/Editimg';
import PictureView from './screens/PictureViewComponent/PictureView';
import AddImage from './screens/AddImageComponent/AddImage';
import SavedImage from './screens/SaveImgComponent/SavedImage';
import SplashScreen from './screens/SplashScreen';
import StickerShop from './screens/StickerShopComponent/StickerShop';
import AddedStickers from './screens/addedStickerComponent/AddedStickers';
import ShowStickers from './screens/ShowStickerComponent/ShowStickers';
import Second from "./screens/addedStickerComponent/second";
import First from "./screens/addedStickerComponent/first";
import ShowSavedImg from "./screens/SaveImgComponent/ShowSavedImg"
let {width, height} = Dimensions.get('window');

export default class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = { isLoading: true },
    this.springValue = new Animated.Value(100);
  }
  state = {
    backClickCount: 0
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  _spring() {
    this.setState({backClickCount: 1}, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -.15 * height,
            friction: 5,
            duration: 300,
            useNativeDriver: true,
          }
          ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }
          ),

        ]).start(() => {
          this.setState({backClickCount: 0});
        });
      });

  }

  handleBackButton = () => {
    this.state.backClickCount == 1 ? BackHandler.exitApp() : this._spring();

    return true;
  };


  closeActivityIndicator = () => setTimeout(() => this.setState({
    isLoading: false }), 500)

  componentDidMount = () => this.closeActivityIndicator()


  render() {

    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    else{
      return (
        <View style={styles.container}>
        <Routes />


        <View >
        <Animated.View style={[styles.animatedView, {transform: [{translateY: this.springValue}]}]}>
        <Text style={styles.exitTitleText}>press back again to exit the app</Text>

        <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => BackHandler.exitApp()}
        >
        <Text style={styles.exitText}>Exit</Text>
        </TouchableOpacity>

        </Animated.View>
        </View>
        </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  animatedView: {
    width,
    backgroundColor: "#000000",
    elevation: 2,
    position: "absolute",
    bottom: 0,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  exitTitleText: {
    textAlign: "center",
    color: "#fff",
    marginRight: 10,
  },
  exitText: {
    color: "#e5933a",
    paddingHorizontal: 10,
    paddingVertical: 3
  }

});


