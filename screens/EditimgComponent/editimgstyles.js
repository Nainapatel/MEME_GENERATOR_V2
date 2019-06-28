import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
      textInputView: {
        height: '60%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textInput: {
        height: 'auto',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        color: '#FFF',
        justifyContent: 'center',
        alignItems:'center',
        fontSize: 25,
      },
      iconButton: {
        width: 50, height: 50
      },
      colorBar: {
        width: '100%',
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
    
      },
      colorButton: {
        width: 50,
        height: 60,
      },
      colorButtonView: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#FFF',
      },
    
      iconButton:{
        height: 50,
        width:50,
      },
      floatingBottomRightButton:{
        // position: 'absolute',
        bottom: 0,
        right: 0,
        paddingRight: 15,
        paddingBottom: 15,
        // zIndex: 1
      },
      toolBar: {
        position: 'absolute',
        bottom:0,
        right: 0,
        paddingTop: 15,
        width: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
    
      }
    })