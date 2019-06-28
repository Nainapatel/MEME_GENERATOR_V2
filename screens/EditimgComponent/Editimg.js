
import React, {Component} from 'react';
import {Platform, View,Keyboard, BackHandler,TouchableOpacity,TextInput ,TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import PropTypes from 'prop-types';
import {COLORS, FADEDBLACK, FADEDWHITE} from '../CaptionCompoent/Caption';
import styles from './editimgstyles';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  {children}
  </TouchableWithoutFeedback>
  );

export default class Editimg extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      image: undefined,
      backgroundColor: "transparent",
      textInput:[],
      totalText: 0,
      color: [],
      text: [],
      onChangeValue:'',
      existingIndex: -1,
    }

    this.input = null;
    this.onColorSelected = this.onColorSelected.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this._handleBackPress = this._handleBackPress.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
  }

  componentDidMount() {
    if(Platform.OS == "android"){AndroidKeyboardAdjust.setAdjustNothing();}


    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);

    //  document.addEventListener('click',  this._handleBackPress);
  }

  componentWillUnmount() {
    if(Platform.OS == "android"){AndroidKeyboardAdjust.setAdjustResize();}
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
    //document.removeEventListener('click', this._handleBackPress);

  }
//on Back press call function 
  _handleBackPress(){
    this._keyboardDidHide();
    return true;
  }
  _keyboardDidShow () {

  }
//on Back press set text, color and existingIndex
  _keyboardDidHide () {
    if(this.state.text.length == 0){
      this.props.onCancel();
    }
    this.props.onFinish(this.state.text, this.state.color,this.state.existingIndex);
  }
/** @param {*} newText : text  */
  onChangeText(newText, index){

    const ExistingText = this.state.text;
    ExistingText[index] = newText;
    this.setState({text:ExistingText,backgroundColor: this.state.color == "#000000" ?  FADEDWHITE : FADEDBLACK})
  }
/** @param {*} color : selected color  */
  onColorSelected(color){

    var bg;
    bg = color == "#000000" ?  FADEDWHITE : FADEDBLACK;
    let existingColor = this.state.color;
    existingColor[this.state.existingIndex] = color;
    this.setState({color: existingColor, backgroundColor: bg});

  }
  //display color bar
  renderColorBar(){
    return (

      <View style={styles.colorBar}>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[0])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[0]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[1])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[1]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[2])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[2]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[3])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[3]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[4])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[4]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[5])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[5]}]}></View></TouchableOpacity>
      <TouchableOpacity onPressOut={()=>{this.onColorSelected(COLORS[6])}} style={[styles.colorButton]}><View style={[styles.colorButtonView, {backgroundColor: COLORS[6]}]}></View></TouchableOpacity>
      </View>


      );
  }
/** @param {*} key : addTextInput function call from picture view and key is loopcount */

  addTextInput = (key) => {

    console.log("this.state.textinput in edit image screen ",this.state.textInput);
    let textInput = this.state.textInput;
    textInput.push(key);
    let existinColor = this.state.color;
    existinColor.push('#fff');
    let existinText = this.state.text;
    existinText.push("Sample Text");
    this.setState({ text: existinText,textInput,color:existinColor, existingIndex: this.state.existingIndex + 1 });
  }


  render(){
    console.log("in text edit ----------------",this.state.existingIndex);
    let len = this.state.text.length;
    

    if(this.props.enabled){
      return (

        <DismissKeyboard>
        <View style={[ this.props.style, {backgroundColor: this.state.backgroundColor}]}>
        <View style={styles.textInputView}>
        {len > 0 ? this.renderColorBar() : null}
        {this.state.textInput.map((value, index) => {
          return (

            <TextInput
            key={index}
            autoFocus={true}
            style={[styles.textInput, {color: this.state.color[index]}]}
            multiline={true}
            autoGrow = {true}
            maxLength={140}
            underlineColorAndroid='transparent'
            name="text"
            onChangeText={(text)=>
              this.onChangeText(text, index)
            }
            value={this.state.text[index]}
            editable={true}
            />
           
            )
        })}
        
        
        </View>

        </View>
        </DismissKeyboard>
        );
    }else{
      return null;
    }
    
  }
}


Editimg.propTypes = {
  onCancel: PropTypes.func,
  onFinish: PropTypes.func,
  enabled: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Editimg.defaultProps = {
  onCancel: () => {},
  onFinish: () => {},
  enabled: false,
};

